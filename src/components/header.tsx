import { Menu, Package, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/use-auth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                to="/carriers"
                className="text-white hover:text-blue-200 transition-colors"
              >
                Carriers
              </Link>
              <Link
                to="/shippers"
                className="text-white hover:text-blue-200 transition-colors"
              >
                Shippers
              </Link>
              <Link
                to="/blog"
                className="text-white hover:text-blue-200 transition-colors"
              >
                Blog
              </Link>
              <Link
                to="/support"
                className="text-white hover:text-blue-200 transition-colors"
              >
                Support
              </Link>
              <Link
                to="/covid"
                className="text-white hover:text-blue-200 transition-colors"
              >
                Safety First
              </Link>
            </div>
          </div>

          {auth.isAuthenticated && auth.user?.is_email_verified ? (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/about"
                className="text-white hover:text-blue-200 transition-colors"
              >
                About
              </Link>
              <Link
                to="/dashboard"
                className="text-white hover:text-blue-200 transition-colors"
              >
                Dashboard
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/about"
                className="text-white hover:text-blue-200 transition-colors"
              >
                About
              </Link>
              <Link
                to="/login"
                className="text-white hover:text-blue-200 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/sign-up"
                className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors font-medium cursor-pointer"
              >
                Sign up
              </Link>
            </div>
          )}

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-blue-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/carriers"
              className="block px-3 py-2 text-white hover:bg-blue-700 rounded-md"
            >
              Carriers
            </Link>
            <Link
              to="/shippers"
              className="block px-3 py-2 text-white hover:bg-blue-700 rounded-md"
            >
              Shippers
            </Link>
            <Link
              to="/blog"
              className="block px-3 py-2 text-white hover:bg-blue-700 rounded-md"
            >
              Blog
            </Link>
            <Link
              to="/support"
              className="block px-3 py-2 text-white hover:bg-blue-700 rounded-md"
            >
              Support
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-white hover:bg-blue-700 rounded-md"
            >
              About
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 text-white hover:bg-blue-700 rounded-md"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
