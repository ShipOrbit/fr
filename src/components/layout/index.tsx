import { Package, Shield, Star, Truck } from "lucide-react";
import React from "react";
import { Link } from "react-router";

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-60 right-20 w-32 h-32 bg-indigo-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-40 left-1/4 w-48 h-48 bg-cyan-300 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 right-1/3 w-36 h-36 bg-blue-300 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>
      {/* Premium Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%234F46E5' fill-opacity='1'%3e%3ccircle cx='7' cy='7' r='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`,
          }}
        ></div>
      </div>
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 animate-float">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 shadow-lg">
            <Package className="w-6 h-6 text-blue-500" />
          </div>
        </div>
        <div
          className="absolute top-1/3 right-1/4 animate-float"
          style={{ animationDelay: "2s" }}
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 shadow-lg">
            <Truck className="w-7 h-7 text-indigo-500" />
          </div>
        </div>
        <div
          className="absolute bottom-1/3 left-1/5 animate-float"
          style={{ animationDelay: "1s" }}
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 shadow-lg">
            <Shield className="w-6 h-6 text-cyan-500" />
          </div>
        </div>
      </div>
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Premium Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-8">
            <Link to="/">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-lg opacity-30"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full shadow-xl">
                  <Package className="w-10 h-10 text-white" />
                </div>
              </div>
            </Link>

            <div className="ml-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                ShipOrbit
              </h1>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 text-yellow-400 fill-current"
                  />
                ))}
                <span className="text-xs text-gray-500 ml-2">
                  Trusted by 10k+ shippers
                </span>
              </div>
            </div>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
};

export default Layout;
