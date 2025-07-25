import { MapPin, Calendar, Building, Clock, HandHeart } from "lucide-react";
import { Link } from "react-router";
import { shipperApi } from "../services/api/shipper";
import FacilityForm from "./facility-form";
import Modal from "./modal";
import type { Facility, Shipment } from "../types";
import { useState } from "react";

export type CreateShipmentAppointmentProps = {
  shipment: Shipment;
  setShipment: React.Dispatch<React.SetStateAction<Shipment | null>>;
};

export default function CreateShipmentAppointment({
  shipment,
  setShipment,
}: CreateShipmentAppointmentProps) {
  const [showPickupModal, setShowPickupModal] = useState(false);
  const [showDropoffModal, setShowDropoffModal] = useState(false);
  const upateFacilityInShipmentState =
    (location: "pickup" | "dropoff") => (facility: Facility) =>
      setShipment((prev) => ({
        ...prev!,
        [location]: { ...prev![location], ...facility },
      }));
  return (
    <>
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
                        {shipment.pickup.city.name},{" "}
                        {shipment.pickup.city.region_code}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Date: {shipment.pickup.date}</span>
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
                    {shipment.miles}mi ({shipment?.min_transit_time} hr transit
                    time)
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
                        {shipment.dropoff.city.name},{" "}
                        {shipment.dropoff.city.region_code}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Date: {shipment.dropoff.date}</span>
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
                    checked={shipment.driver_assist}
                    onChange={async (e) => {
                      setShipment((prev) => ({
                        ...prev!,
                        driver_assist: e.target.checked,
                      }));
                      await shipperApi.updateShipmentAppointment(shipment.id, {
                        driver_assist: e.target.checked,
                      });
                    }}
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
                  $
                  {parseFloat(shipment?.base_price) +
                    (shipment.driver_assist ? 150 : 0)}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Base rate</span>
                  <span className="font-medium">${shipment?.base_price}</span>
                </div>
                {shipment.driver_assist && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Driver assist</span>
                    <span className="font-medium">$150</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Link
                  to={`/shipments/${shipment.id}/finalizing`}
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Book shipment
                </Link>
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
        title={`Pick-up - ${shipment.pickup.date}`}
      >
        <FacilityForm
          shipment={shipment}
          type="pickup"
          date={shipment.pickup.date}
          updateShipmentState={upateFacilityInShipmentState("pickup")}
          onClose={() => setShowPickupModal(false)}
        />
      </Modal>

      <Modal
        isOpen={showDropoffModal}
        onClose={() => setShowDropoffModal(false)}
        title={`Drop-off - ${shipment.dropoff.date}`}
      >
        <FacilityForm
          shipment={shipment}
          type="dropoff"
          date={shipment.dropoff.date}
          updateShipmentState={upateFacilityInShipmentState("dropoff")}
          onClose={() => setShowDropoffModal(false)}
        />
      </Modal>
    </>
  );
}
