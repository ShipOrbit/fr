import { CheckCircle, Loader2, Mail, RefreshCw } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import Layout from "../../components/layout";
import { authApi } from "../../services/api/auth";
import { useNavigate } from "react-router";

const EmailVerification: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [resendSuccess, setResendSuccess] = useState(false);

  useEffect(() => {
    if (user?.shipping_needs) {
      navigate("/dashboard");
    }
  }, [navigate, user]);

  const handleResendEmail = async () => {
    if (!user?.email) return;

    setIsResending(true);
    setResendMessage("");
    setResendSuccess(false);

    try {
      // Simulate API call
      await authApi.resendVerificationEmail();
      setResendMessage("Verification email sent successfully!");
      setResendSuccess(true);
    } catch {
      setResendMessage("Failed to send verification email. Please try again.");
      setResendSuccess(false);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="lg:flex">
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
                      <div className="h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white text-xs font-bold">3</span>
                      </div>
                      <span className="text-sm font-medium text-blue-600">
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
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
                    <Mail className="h-8 w-8 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Check your email
                  </h2>
                  <p className="text-gray-600 mb-6">
                    To complete your registration for{" "}
                    <strong>{user?.company?.name}</strong>, please follow the
                    instructions we just sent to your email address.
                  </p>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-600 mb-1">Email address</p>
                    <p className="text-lg font-medium text-gray-900">
                      {user?.email}
                    </p>
                  </div>

                  <p className="text-sm text-gray-600 mb-6">
                    If you have trouble finding the email, try checking your
                    spam folder or make sure the email address you provided is
                    correct.
                  </p>

                  {/* Resend Section */}
                  <div className="border-t pt-6">
                    <p className="text-sm text-gray-600 mb-4">
                      Didn't receive the email?
                    </p>

                    <button
                      onClick={handleResendEmail}
                      disabled={isResending}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed mr-4"
                    >
                      {isResending ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Resend email
                        </>
                      )}
                    </button>
                    {resendMessage && (
                      <div
                        className={`mt-4 p-3 rounded-md text-sm ${
                          resendSuccess
                            ? "bg-green-50 border border-green-200 text-green-700"
                            : "bg-red-50 border border-red-200 text-red-700"
                        }`}
                      >
                        {resendMessage}
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Help */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-900 mb-2">
                    What happens next?
                  </h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Click the verification link in your email</li>
                    <li>• Your account will be activated instantly</li>
                    <li>• You'll be redirected to your ShipOrbit dashboard</li>
                    <li>• Start managing your shipments right away</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmailVerification;
