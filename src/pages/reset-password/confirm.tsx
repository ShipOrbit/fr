import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { CheckCircle2, Loader2, Lock, Package } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router";
import { z } from "zod";
import Layout from "../../components/layout";
import { authApi, handleApiError } from "../../services/api/auth";
import { confirmResetPasswordSchema } from "./schema";

type confirmResetPasswordFormData = z.infer<typeof confirmResetPasswordSchema>;

const ConfirmResetPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [generalError, setGeneralError] = useState<string | string[]>("");
  const { token } = useParams<{ token: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<confirmResetPasswordFormData>({
    resolver: zodResolver(confirmResetPasswordSchema),
    defaultValues: { token },
    mode: "onChange",
  });

  const onSubmit = async (data: confirmResetPasswordFormData) => {
    setIsLoading(true);
    setGeneralError("");

    try {
      await authApi.passwordResetConfirm(data);
      setSuccess(true);
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

  if (success) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-5">
            <div className="flex justify-center">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Reset Success
            </h2>
            <Link
              className="mx-auto py-2 px-4 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              to="/login"
            >
              Continue Go To Login
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Package className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              ShipOrbit Password
            </h2>
          </div>

          <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {generalError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  {generalError}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    {...register("password")}
                    className={`block w-full pl-10 pr-3 py-2 border ${
                      errors.password ? "border-red-300" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Password"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Reset Password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConfirmResetPassword;
