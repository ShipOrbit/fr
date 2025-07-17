import axios, { AxiosError, type AxiosResponse } from "axios";
import type {
  RegisterStepOneData,
  RegisterStepTwoData,
  LoginData,
  PasswordResetData,
  PasswordResetConfirmData,
  AuthResponse,
  User,
  ApiError,
} from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/sign-in";
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  // Register step 1
  registerStepOne: async (data: RegisterStepOneData) => {
    const response: AxiosResponse<{
      message: string;
      user_id: string;
      email: string;
      first_name: string;
      company_name: string;
    }> = await api.post("/auth/register/step-1/", data);
    return response.data;
  },

  // Register step 2
  registerStepTwo: async (data: RegisterStepTwoData) => {
    const response: AxiosResponse<{
      message: string;
      redirect_to_verification: boolean;
    }> = await api.post("/auth/register/step-2/", data);
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
  resendVerificationEmail: async (email: string) => {
    const response: AxiosResponse<{ message: string }> = await api.post(
      "/auth/resend-verification/",
      { email }
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
  if (error.response?.data) {
    return {
      message: error.response.data.message || "An error occurred",
      errors: error.response.data.errors || {},
    };
  }
  return {
    message: error.message || "Network error occurred",
  };
};

export default api;
