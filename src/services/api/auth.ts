import { AxiosError, type AxiosResponse } from "axios";
import type {
  ApiError,
  AuthResponse,
  LoginData,
  PasswordResetConfirmData,
  PasswordResetData,
  RegisterStepOneData,
  User,
} from "../../types";
import api from ".";

// Auth API
export const authApi = {
  // Register step 1
  registerStepOne: async (data: RegisterStepOneData) => {
    const response: AxiosResponse = await api.post(
      "/auth/register/step-1/",
      data
    );
    return response.data;
  },

  // Login
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await api.post(
      "/auth/login/",
      data
    );
    return response.data;
  },

  // Password reset request
  passwordResetRequest: async (data: PasswordResetData) => {
    const response: AxiosResponse<{ message: string }> = await api.post(
      "/auth/password-reset/request/",
      data
    );
    return response.data;
  },

  // Password reset confirm
  passwordResetConfirm: async (data: PasswordResetConfirmData) => {
    const response: AxiosResponse<{ message: string }> = await api.post(
      "/auth/password-reset/confirm/",
      data
    );
    return response.data;
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response: AxiosResponse<User> = await api.get("/auth/user/");
    return response.data;
  },

  // Resend verification email
  resendVerificationEmail: async () => {
    const response: AxiosResponse<{ message: string }> = await api.post(
      "/auth/resend-verification/"
    );
    return response.data;
  },

  // Verify email
  verifyEmail: async (token: string) => {
    const response: AxiosResponse<{ message: string }> = await api.post(
      "/auth/verify-email/",
      { token }
    );
    return response.data;
  },

  // Logout
  logout: async () => {
    try {
      await api.post("/auth/logout/");
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },
};

// Error handling utility
export const handleApiError = (error: AxiosError<ApiError>): ApiError => {
  if (error.response?.data.errors) {
    const { non_field_errors, ...errors } = error.response.data.errors;
    const message = non_field_errors?.toString() || "An error occurred";
    return { message: message, errors: errors };
  }
  return {
    message:
      error.response?.data.message || error.message || "Network error occurred",
  };
};

export default api;
