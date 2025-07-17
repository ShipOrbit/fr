import { useState, useEffect } from "react";
import {
  type AuthProviderProps,
  AuthContext,
  type AuthContextType,
} from "../contexts/app-context";
import { authApi, handleApiError } from "../services/api";
import type { User, LoginData, AuthResponse } from "../types";
import { AxiosError } from "axios";

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!token && !!user;

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(userData);

          // Verify token is still valid
          await authApi.getCurrentUser();
        } catch {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (
    data: LoginData
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response: AuthResponse = await authApi.login(data);

      setToken(response.token);
      setUser(response.user);

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      return { success: true, message: response.message };
    } catch (error) {
      if (error instanceof AxiosError) {
        const apiError = handleApiError(error);
        return { success: false, message: apiError.message };
      }
      return { success: false, message: "Something Went Wrong, Try Again." };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    authApi.logout().catch(() => {
      // Ignore errors during logout API call
    });
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isLoading,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
