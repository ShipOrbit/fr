import { Building, Calendar, Clock, HandHeart, MapPin, X } from "lucide-react";
import React, { useState, type PropsWithChildren } from "react";
import Header from "../components/header";

const CreateShipmentAppointment: React.FC = () => {
  const [driverAssist, setDriverAssist] = useState(false);
  const [showPickupModal, setShowPickupModal] = useState(false);
  const [showDropoffModal, setShowDropoffModal] = useState(false);

  // Sample data - in real app would come from props or state
  const shipmentData = {
    pickup: {
      city: "Los Angeles",
      state: "CA",
      date: "15/12/2024",
    },
    dropoff: {
      city: "New York",
      state: "NY",
      date: "18/12/2024",
    },
    miles: 2789,
    transitTime: 3,
    basePrice: 2500,
  };

  type ModalProps = {
    isOpen: boolean;
    title: string;
    onClose: () => void;
  };

  const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
    isOpen,
    onClose,
    title,
    children,
  }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    );
  };

  const FacilityForm = ({ type }: { type: string; date: string }) => (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Facility name or owner
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter facility name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Facility address
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter street address"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Town/City
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
          value={
            type === "pickup"
              ? shipmentData.pickup.city
              : shipmentData.dropoff.city
          }
          disabled
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State/County
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            value={
              type === "pickup"
                ? shipmentData.pickup.state
                : shipmentData.dropoff.state
            }
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Postcode
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="12345"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Facility scheduling preference
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="scheduling"
              value="first-come"
              defaultChecked
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              First come, first served
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="scheduling"
              value="scheduled"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Appointment already scheduled
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="scheduling"
              value="to-schedule"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Appointment to be scheduled by ShipOrbit
            </span>
          </label>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-md font-semibold text-gray-900 mb-4">
          Facility contact information
        </h4>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facility contact name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Contact name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone number
              </label>
              <input
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="contact@facility.com"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={() => {
            setShowPickupModal(false);
            setShowDropoffModal(false);
          }}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Submit
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Appointment Times */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Confirm appointment times
              </h2>

              {/* Pickup */}
              <div className="mb-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {shipmentData.pickup.city}, {shipmentData.pickup.state}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Date: {shipmentData.pickup.date}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPickupModal(true)}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    <Building className="h-4 w-4" />
                    <span>Add facility info</span>
                  </button>
                </div>
              </div>

              {/* Transit Info */}
              <div className="text-center py-4">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>
                    {shipmentData.miles}mi ({shipmentData.transitTime} hr
                    transit time)
                  </span>
                </div>
              </div>

              {/* Dropoff */}
              <div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <MapPin className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {shipmentData.dropoff.city},{" "}
                        {shipmentData.dropoff.state}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Date: {shipmentData.dropoff.date}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDropoffModal(true)}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    <Building className="h-4 w-4" />
                    <span>Add facility info</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Driver Assist */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <input
                    type="checkbox"
                    id="driver-assist"
                    checked={driverAssist}
                    onChange={(e) => setDriverAssist(e.target.checked)}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="driver-assist"
                    className="block text-lg font-semibold text-gray-900 mb-2"
                  >
                    Driver assist
                  </label>
                  <p className="text-sm text-gray-600">
                    Your driver will help move pallets and load/unload the
                    truck.
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-blue-600">
                  <HandHeart className="h-5 w-5" />
                  <span className="text-sm font-medium">+$150</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Pricing */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Total</h3>
                <div className="text-2xl font-bold text-blue-600">
                  ${shipmentData.basePrice + (driverAssist ? 150 : 0)}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Base rate</span>
                  <span className="font-medium">${shipmentData.basePrice}</span>
                </div>
                {driverAssist && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Driver assist</span>
                    <span className="font-medium">$150</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
                  Book shipment
                </button>
                <p className="text-center text-sm text-gray-600">
                  Add final details in the next step
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <Modal
        isOpen={showPickupModal}
        onClose={() => setShowPickupModal(false)}
        title={`Pick-up - ${shipmentData.pickup.date}`}
      >
        <FacilityForm type="pickup" date={shipmentData.pickup.date} />
      </Modal>

      <Modal
        isOpen={showDropoffModal}
        onClose={() => setShowDropoffModal(false)}
        title={`Drop-off - ${shipmentData.dropoff.date}`}
      >
        <FacilityForm type="dropoff" date={shipmentData.dropoff.date} />
      </Modal>
    </div>
  );
};

export default CreateShipmentAppointment;
