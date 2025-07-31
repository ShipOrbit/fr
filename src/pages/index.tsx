import { ArrowRight, Clock, Package, Shield, Star, Zap } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { LocationSearchInput } from "../components/location-search-input";
import { useFetch } from "../hooks/use-fetch";
import { shipperApi } from "../services/api/shipper";
import type { GeoDBCity } from "../types";

const ShippingLandingPage = () => {
  const [pickupLocation, setPickupLocation] = useState<GeoDBCity>();
  const [dropoffLocation, setDropoffLocation] = useState<GeoDBCity>();
  const [equipment] = useState("dryVan");
  const { data: distancePrice } = useFetch(
    async () =>
      pickupLocation && dropoffLocation
        ? shipperApi.getDistancePrice({
            pickup_location: pickupLocation,
            dropoff_location: dropoffLocation,
            equipment,
          })
        : null,
    [pickupLocation, dropoffLocation, equipment]
  );

  const getCities = (search: string) =>
    shipperApi.searchCities({ name_prefix: search });

  const onPickLocationSelect = (city: GeoDBCity) => {
    setPickupLocation(city);
  };
  const onDropoffLocationSelect = (city: GeoDBCity) => {
    setDropoffLocation(city);
  };

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

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Premium Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-lg opacity-30"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full shadow-xl">
                <Package className="w-10 h-10 text-white" />
              </div>
            </div>
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

        {/* Enhanced Hero Section */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Premium Title Section */}
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-blue-100 shadow-sm">
                  <Zap className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-700">
                    Fastest Shipping Platform
                  </span>
                </div>

                <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                    Ship Smarter,
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Save More
                  </span>
                </h2>

                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Get instant quotes, track shipments in real-time, and connect
                  with verified carriers. Experience premium logistics made
                  simple.
                </p>

                {/* Trust Indicators */}
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-green-500" />
                    <span>5 min setup</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-1 text-blue-500" />
                    <span>Fully insured</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    <span>4.9/5 rating</span>
                  </div>
                </div>
              </div>

              {/* Quote Calculator */}
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/40 p-8 shadow-2xl">
                {/* Dynamic Price Display */}
                <div className="text-center mb-8">
                  <div className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                    {distancePrice
                      ? `$${distancePrice.base_price.toLocaleString()}`
                      : "Get Quote"}
                  </div>
                  <p className="text-lg text-gray-600 mb-3">
                    Instant Shipping Estimate
                  </p>
                  {distancePrice && (
                    <div className="flex items-center justify-center text-green-600 animate-fade-in">
                      <Zap className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Live pricing</span>
                    </div>
                  )}
                </div>

                {/* Location Inputs */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ship From
                    </label>
                    <LocationSearchInput
                      placeholder="Enter pickup city"
                      onSelect={onPickLocationSelect}
                      getCities={getCities}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ship To
                    </label>
                    <LocationSearchInput
                      placeholder="Enter delivery city"
                      onSelect={onDropoffLocationSelect}
                      getCities={getCities}
                    />
                  </div>
                </div>

                {/* CTA Button */}
                <Link to="/login">
                  <button className="group relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center justify-center">
                      Get Started - It's Free
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Column - Premium Image */}
            <div className="relative lg:block hidden">
              <div className="relative">
                {/* Image Container with Premium Effects */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
                  {/* Premium shipping image */}
                  <div className="aspect-[4/5]">
                    <img
                      src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                      alt="Modern shipping containers and logistics"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Floating Stats Cards */}
                <div className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/40">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">24/7</div>
                    <div className="text-xs text-gray-600">Support</div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/40">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">98%</div>
                    <div className="text-xs text-gray-600">On-time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingLandingPage;
