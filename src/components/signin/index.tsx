import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { Package, Mail, Lock, Loader2 } from "lucide-react";
import { AxiosError } from "axios";
import Layout from "../layout";
import { useAuth } from "../../hooks/use-auth";
import { authApi, handleApiError } from "../../services/api/auth";
import type { AuthResponse } from "../../types";
import loginSchema from "./schema";

type LoginFormData = z.infer<typeof loginSchema>;

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | string[]>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setGeneralError("");

    try {
      const response: AuthResponse = await authApi.login(data);

      const result = await login(response);

      if (result.success) {
        navigate("/dashboard");
      } else {
        setGeneralError(result.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const apiError = handleApiError(error);
        setGeneralError(apiError.message);
      } else {
        setGeneralError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Package className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Sign in to ShipOrbit
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up here
              </Link>
            </p>
          </div>

          <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {generalError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  {generalError}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className={`block w-full pl-10 pr-3 py-2 border ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    {...register("password")}
                    className={`block w-full pl-10 pr-3 py-2 border ${
                      errors.password ? "border-red-300" : "border-gray-300"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Enter your password"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    to="/reset-password"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
