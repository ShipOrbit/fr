import { AxiosError } from "axios";
import { AlertCircle, CheckCircle, Loader2, Mail } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Layout from "../../components/layout";
import { authApi, handleApiError } from "../../services/api/auth";

const VerifyEmail: React.FC = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [verifyMessage, setVerifyMessage] = useState("Verifying Email");
  const [verifySuccess, setVerifySuccess] = useState(false);
  const { token } = useParams<{ token: string }>();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await authApi.verifyEmail(token!);
        setVerifySuccess(true);
        setVerifyMessage("Email Verified Successfully");
      } catch (error) {
        setVerifySuccess(false);

        if (error instanceof AxiosError) {
          const apiError = handleApiError(error);

          if (apiError.errors) {
            setVerifyMessage(apiError.errors["token"].toString());
          } else {
            setVerifyMessage(apiError.message);
          }
        } else {
          setVerifyMessage("We Couldn't Verify Your Email, Try Again.");
        }
      } finally {
        setIsVerifying(false);
      }
    };
    verifyEmail();
  }, [token]);

  return (
    <Layout>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Left side - Progress and Content */}
            <div className="p-8">
              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                    <span className="text-sm font-medium text-gray-900">
                      Contact Info
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                    <span className="text-sm font-medium text-gray-900">
                      Shipping Needs
                    </span>
                  </div>
                  <div className="flex items-center">
                    {isVerifying ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : verifySuccess ? (
                      <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                    ) : (
                      <div className="h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white text-xs font-bold">3</span>
                      </div>
                    )}
                    <span className="text-sm font-medium">
                      Account Creation
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>

              {/* Main Content */}
              <div className="text-center mb-8">
                {isVerifying ? (
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
                    <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                  </div>
                ) : verifySuccess ? (
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                    <Mail className="h-8 w-8 text-green-600" />
                  </div>
                ) : (
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                  </div>
                )}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {verifyMessage}
                </h2>
                {verifySuccess && (
                  <Link
                    className="mx-auto py-2 px-4 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    to="/dashboard"
                  >
                    Continue To Dashboard
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VerifyEmail;
