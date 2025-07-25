import { Package } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../hooks/use-auth";

const Header = () => {
  const auth = useAuth();

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="bg-white rounded-full p-2 mr-3">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-white text-xl font-bold">ShipOrbit</span>
              </div>
            </div>
          </Link>

          {auth.isAuthenticated && auth.user?.is_email_verified ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="text-white hover:text-blue-200 transition-colors"
              >
                Dashboard
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-white hover:text-blue-200 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/sign-up"
                className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors font-medium cursor-pointer"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
