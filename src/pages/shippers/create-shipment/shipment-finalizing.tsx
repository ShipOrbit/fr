import { MapPin, Package, Truck } from "lucide-react";
import React, { useState } from "react";
import Layout from "../components/layout";

// Mock data for shipment details (would come from props/state in real app)
const mockShipment = {
  basePrice: 1250,
  driverAssist: false,
};

const ShipmentFinalizing: React.FC = () => {
  const [formData, setFormData] = useState({
    referenceNumber: "",
    weight: "",
    commodity: "",
    packaging: "",
    packagingType: "",
    pickupNumber: "",
    pickupNotes: "",
    dropoffNumber: "",
    dropoffNotes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const totalPrice =
    mockShipment.basePrice + (mockShipment.driverAssist ? 150 : 0);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <Package className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        Finalize shipping details
                      </h1>
                      <p className="text-gray-600 mt-1">
                        We just need a bit more information to move your
                        shipment
                      </p>
                    </div>
                  </div>
                </div>

                <form className="px-8 py-6 space-y-8">
                  {/* Shipment Section */}
                  <div>
                    <div className="flex items-center space-x-2 mb-6">
                      <Package className="h-6 w-6 text-blue-600" />
                      <h2 className="text-xl font-semibold text-gray-900">
                        Shipment
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="referenceNumber"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Customer reference number
                        </label>
                        <input
                          type="text"
                          id="referenceNumber"
                          name="referenceNumber"
                          value={formData.referenceNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          required
                          minLength={1}
                          maxLength={500}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="weight"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Weight
                        </label>
                        <input
                          type="number"
                          id="weight"
                          name="weight"
                          value={formData.weight}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          required
                          min={1}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
                      <div className="md:col-span-6">
                        <label
                          htmlFor="commodity"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Commodity
                        </label>
                        <input
                          type="text"
                          id="commodity"
                          name="commodity"
                          value={formData.commodity}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          required
                          minLength={1}
                          maxLength={500}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label
                          htmlFor="packaging"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Packaging
                        </label>
                        <input
                          type="number"
                          id="packaging"
                          name="packaging"
                          value={formData.packaging}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          required
                          min={1}
                        />
                      </div>
                      <div className="md:col-span-4">
                        <label
                          htmlFor="packagingType"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Packaging type
                        </label>
                        <input
                          type="text"
                          id="packagingType"
                          name="packagingType"
                          value={formData.packagingType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          required
                          minLength={1}
                          maxLength={500}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pickup Section */}
                  <div>
                    <div className="flex items-center space-x-2 mb-6">
                      <MapPin className="h-6 w-6 text-green-600" />
                      <h2 className="text-xl font-semibold text-gray-900">
                        Pickup
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="pickupNumber"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Pickup number
                        </label>
                        <input
                          type="text"
                          id="pickupNumber"
                          name="pickupNumber"
                          value={formData.pickupNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          required
                          minLength={1}
                          maxLength={500}
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <label
                        htmlFor="pickupNotes"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Additional notes
                      </label>
                      <textarea
                        id="pickupNotes"
                        name="pickupNotes"
                        value={formData.pickupNotes}
                        onChange={handleInputChange}
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Let us know if there are any specifics we need to know about this facility"
                        required
                        minLength={1}
                        maxLength={500}
                      />
                    </div>
                  </div>

                  {/* Dropoff Section */}
                  <div>
                    <div className="flex items-center space-x-2 mb-6">
                      <MapPin className="h-6 w-6 text-red-600" />
                      <h2 className="text-xl font-semibold text-gray-900">
                        Dropoff
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="dropoffNumber"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Dropoff number
                        </label>
                        <input
                          type="text"
                          id="dropoffNumber"
                          name="dropoffNumber"
                          value={formData.dropoffNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          required
                          minLength={1}
                          maxLength={500}
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <label
                        htmlFor="dropoffNotes"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Additional notes
                      </label>
                      <textarea
                        id="dropoffNotes"
                        name="dropoffNotes"
                        value={formData.dropoffNotes}
                        onChange={handleInputChange}
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Let us know if there are any specifics we need to know about this facility"
                        required
                        minLength={1}
                        maxLength={500}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Price Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden sticky top-8">
                <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-2">
                      <Truck className="h-5 w-5" />
                      <h3 className="text-lg font-semibold">Total</h3>
                    </div>
                    <div className="text-2xl font-bold">
                      ${totalPrice.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Base rate</span>
                    <span className="font-medium">
                      ${mockShipment.basePrice.toLocaleString()}
                    </span>
                  </div>

                  {mockShipment.driverAssist && (
                    <div className="flex justify-between items-center py-2 border-t border-gray-100">
                      <span className="text-gray-600">Driver assist</span>
                      <span className="font-medium">$150</span>
                    </div>
                  )}

                  <div className="pt-4 space-y-3">
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Finalize shipment
                    </button>
                    <button
                      type="button"
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Save and finish later
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShipmentFinalizing;
