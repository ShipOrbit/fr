import { Loader2 } from "lucide-react";
import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../../hooks/use-auth";
import Header from "./header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.shipping_needs) {
    return <Navigate to="/sign-up-2" replace />;
  }

  if (!user.is_email_verified) {
    return <Navigate to="/sign-up-3" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
