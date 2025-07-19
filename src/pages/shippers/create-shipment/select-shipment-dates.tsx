import {
  ArrowRight,
  Calendar,
  ChevronDown,
  MapPin,
  RotateCcw,
  Truck,
} from "lucide-react";
import React, { useState } from "react";
import Layout from "../components/layout";

const SelectDatePage: React.FC = () => {
  const [equipment, setEquipment] = useState("dryVan");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [showEquipmentDropdown, setShowEquipmentDropdown] = useState(false);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const calendarDays = Array.from({ length: 21 }, (_, i) => i + 1);

  return (
    <Layout>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Create Shipment
                  </h1>
                  <p className="text-gray-600">
                    Select dates and locations for your shipment
                  </p>
                </div>
              </div>

              {/* Equipment Dropdown */}
              <div className="relative">
                <button
                  onClick={() =>
                    setShowEquipmentDropdown(!showEquipmentDropdown)
                  }
                  className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg border border-gray-300 transition-colors"
                >
                  <Truck className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {equipment}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>

                {showEquipmentDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setEquipment("dryVan");
                          setShowEquipmentDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Dry Van
                      </button>
                      <button
                        onClick={() => {
                          setEquipment("reefer");
                          setShowEquipmentDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Reefer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-6">
            <form className="space-y-6">
              {/* Location and Date Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pick-up location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      placeholder="City, State"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Drop-off location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={dropoffLocation}
                      onChange={(e) => setDropoffLocation(e.target.value)}
                      placeholder="City, State"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pick-up date
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Drop-off date
                  </label>
                  <input
                    type="date"
                    value={dropoffDate}
                    onChange={(e) => setDropoffDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Calendar Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Select shipment dates
                  </h3>
                  <button
                    type="button"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span className="text-sm font-medium">Reset dates</span>
                  </button>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {days.map((day) => (
                      <div
                        key={day}
                        className="text-center text-sm font-medium text-gray-700 py-2"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {calendarDays.map((day) => (
                      <button
                        key={day}
                        type="button"
                        className="h-10 w-10 mx-auto text-sm rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Summary and Submit */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Distance</p>
                      <p className="text-lg font-bold text-green-600">-- mi</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Transit Time</p>
                      <p className="text-lg font-bold text-green-600">
                        -- days
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Price</p>
                      <p className="text-lg font-bold text-green-600">$--</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <span>Review shipment</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default SelectDatePage;
