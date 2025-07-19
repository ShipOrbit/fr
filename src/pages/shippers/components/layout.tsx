import React, { useEffect } from "react";
import Header from "./header";
import { useAuth } from "../../../hooks/use-auth";
import { useNavigate } from "react-router";

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.shipping_needs) {
      navigate("/sign-up-2");
    } else if (!user.is_email_verified) {
      navigate("/sign-up-3");
    }
  }, [navigate, user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
