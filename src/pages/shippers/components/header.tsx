import React from "react";
import { ChevronDown, Menu } from "lucide-react";
import { useAuth } from "../../../hooks/use-auth";
import { Link, useLocation } from "react-router";
import { cn } from "../../../utils/cn";

const Header: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [dropdown, setDropdown] = useState(false);

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-blue-600">
                  ShipOrbit
                </span>
                <span className="text-gray-500 ml-2">
                  for {user?.company?.name}
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                to="/dashboard"
                className={cn(
                  "text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium",
                  location.pathname.includes("dashboard") &&
                    "text-blue-600 hover:text-blue-700 border-b-2 border-blue-600"
                )}
              >
                Dashboard
              </Link>
              <Link
                to="/create-shipment"
                className={cn(
                  "text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium",
                  location.pathname.includes("create-shipment") &&
                    "text-blue-600 hover:text-blue-700 border-b-2 border-blue-600"
                )}
              >
                Create Shipment
              </Link>
              <Link
                to="/billing"
                className={cn(
                  "text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium",
                  location.pathname.includes("billing") &&
                    "text-blue-600 hover:text-blue-700 border-b-2 border-blue-600"
                )}
              >
                Billing
              </Link>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdown((prev) => !prev)}
                  className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  {user?.first_name}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {/* Dropdown menu would be implemented with state management */}
                {dropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg py-1 z-50">
                    <Link
                      to="/insight"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Insight
                    </Link>
                    <Link
                      to="/download"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Download Shipments
                    </Link>
                    <Link
                      to="/faq"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      View FAQs
                    </Link>
                    <Link
                      to="/terms"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      View Terms
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <Link
                      to="/contact"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Contact us
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={() => {
                        logout();
                        navigate("/login");
                      }}
                      className="w-full cursor-pointer text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600 p-2">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
