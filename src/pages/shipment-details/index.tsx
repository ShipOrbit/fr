import { Building, Clock, Loader2, MapPin, Package, Truck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { shipperApi } from "../../services/api/shipper";
import type { Shipment } from "../../types";
import Header from "../../components/header";

const ShipmentDetails: React.FC = () => {
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const { id } = useParams<{ id: string }>();
  const pickupDate = shipment ? new Date(shipment.pickup.date) : null;
  const dropoffDate = shipment ? new Date(shipment.dropoff.date) : null;

  useEffect(() => {
    if (!id) return;

    const fetchShipment = async () => {
      try {
        const shipment = await shipperApi.getShipmentById({ id });
        console.log({ shipment });
        setShipment(shipment);
      } catch (error) {
        console.log(error);
      }
    };
    fetchShipment();
  }, [id]);

  if (!shipment) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader2 className="animate-spin" />;
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shipping Details</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-8">
            {/* Shipment Section */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <Package className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Shipment</h2>
                {shipment.status === "unfinished" && (
                  <Link
                    to={`/shipments/${shipment.id}/appointment`}
                    className="group relative flex justify-center ml-auto py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Complete Shipment
                  </Link>
                )}
                {shipment.status === "upcoming" && (
                  <Link
                    to={`/shipments/${shipment.id}/finalizing`}
                    className="group relative flex justify-center ml-auto py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Finalizing Shipment
                  </Link>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    Customer Reference
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {shipment.reference_number}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    ShipOrbit Freight Reference
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {shipment.reference_number}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-600 mb-2">Commodity</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {shipment.commodity}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-600 mb-2">Weight</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {shipment.weight},000 lbs
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm text-purple-600 mb-2">Packaging</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {shipment.packaging_type}
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Truck className="h-4 w-4 text-orange-600 mr-1" />
                    <p className="text-sm text-orange-600">Equipment</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {shipment.equipment}
                  </p>
                </div>
              </div>
            </div>

            {/* Pickup Section */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <MapPin className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Pickup</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 rounded-lg p-6">
                  <p className="text-sm text-green-600 mb-2">Pickup Location</p>
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    {shipment.pickup.city.name},{" "}
                    {shipment.pickup.city.region_code}
                  </p>
                  <p className="text-sm text-gray-600">
                    Our team is working on confirming your facility
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 text-blue-600 mr-2" />
                    <p className="text-sm text-blue-600">Pick up time</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 mb-1">
                    {pickupDate!.getMonth() + 1}/{pickupDate?.getDate()}
                  </p>
                  <p className="text-sm text-gray-600">
                    {/* {data.pickup.apointment.minTime} CDT */}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Pickup #</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {shipment.pickup.location_number}
                  </p>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <Building className="h-4 w-4 text-gray-500 mr-2" />
                    <p className="text-sm text-gray-500">Facility Owner</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {shipment.pickup.contact_name}
                  </p>
                </div>
              </div>
            </div>

            {/* Dropoff Section */}
            <div>
              <div className="flex items-center mb-6">
                <MapPin className="h-6 w-6 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Dropoff</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-red-50 rounded-lg p-6">
                  <p className="text-sm text-red-600 mb-2">Dropoff Location</p>
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    {shipment.dropoff.city.name},{" "}
                    {shipment.dropoff.city.region_code}
                  </p>
                  <p className="text-sm text-gray-600">
                    Our team is working on confirming your facility
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 text-purple-600 mr-2" />
                    <p className="text-sm text-purple-600">Drop off time</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 mb-1">
                    {dropoffDate!.getMonth() + 1}/{dropoffDate?.getDate()}
                  </p>
                  <p className="text-sm text-gray-600">
                    {/* {shipment.min_transit_time} CDT */}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Dropoff #</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {shipment.dropoff.location_number}
                  </p>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <Building className="h-4 w-4 text-gray-500 mr-2" />
                    <p className="text-sm text-gray-500">Facility Owner</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {shipment.dropoff.contact_name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetails;
