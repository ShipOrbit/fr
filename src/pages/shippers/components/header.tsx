import React from "react";
import { ChevronDown, Menu } from "lucide-react";
import { useAuth } from "../../../hooks/use-auth";

const Header: React.FC = () => {
  const { user } = useAuth();
  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="/dashboard"
                className="text-blue-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium border-b-2 border-blue-600"
              >
                Dashboard
              </a>
              <a
                href="/create-shipment"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Create Shipment
              </a>
              <a
                href="/billing"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Billing
              </a>

              {/* User Dropdown */}
              <div className="relative">
                <button className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  {user?.first_name}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {/* Dropdown menu would be implemented with state management */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden">
                  <a
                    href="/insight"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Insight
                  </a>
                  <a
                    href="/download"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Download Shipments
                  </a>
                  <a
                    href="/faq"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    View FAQs
                  </a>
                  <a
                    href="/terms"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    View Terms
                  </a>
                  <a
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                  <a
                    href="/contact"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Contact us
                  </a>
                  <hr className="my-1" />
                  <a
                    href="/logout"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </a>
                </div>
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
