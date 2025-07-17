import { createContext, type ReactNode } from "react";
import type { LoginData, User } from "../types";

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (data: LoginData) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export interface AuthProviderProps {
  children: ReactNode;
}
