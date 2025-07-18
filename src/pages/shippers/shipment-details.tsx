import React from "react";
import { Package, MapPin, Clock, Building, Truck } from "lucide-react";
import Header from "./components/header";

interface ShipmentDetailsProps {
  shipment?: {
    parcel: {
      referenceNumber: string;
      commodity: string;
      weight: number;
      packagingType: string;
    };
    equipment: string;
    pickup: {
      location: {
        city: string;
        state: string;
      };
      date: {
        month: string;
        day: string;
      };
      apointment: {
        minTime: string;
      };
      number: string;
      facility: {
        owner: string;
      };
    };
    dropoff: {
      location: {
        city: string;
        state: string;
      };
      date: {
        month: string;
        day: string;
      };
      number: string;
      facility: {
        owner: string;
      };
    };
  };
}

const ShipmentDetails: React.FC<ShipmentDetailsProps> = ({ shipment }) => {
  // Mock data if no shipment provided
  const mockShipment = {
    parcel: {
      referenceNumber: "REF123456",
      commodity: "Electronics",
      weight: 5,
      packagingType: "Boxes",
    },
    equipment: "Dry Van",
    pickup: {
      location: {
        city: "Los Angeles",
        state: "CA",
      },
      date: {
        month: "07",
        day: "25",
      },
      apointment: {
        minTime: "10:00 AM",
      },
      number: "PU123456",
      facility: {
        owner: "ABC Warehouse",
      },
    },
    dropoff: {
      location: {
        city: "Phoenix",
        state: "AZ",
      },
      date: {
        month: "07",
        day: "27",
      },
      number: "DO123456",
      facility: {
        owner: "XYZ Distribution",
      },
    },
  };

  const data = shipment || mockShipment;

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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    Customer Reference
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.parcel.referenceNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    ShipOrbit Freight Reference
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.parcel.referenceNumber}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-600 mb-2">Commodity</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.parcel.commodity}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-600 mb-2">Weight</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.parcel.weight},000 lbs
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm text-purple-600 mb-2">Packaging</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.parcel.packagingType}
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Truck className="h-4 w-4 text-orange-600 mr-1" />
                    <p className="text-sm text-orange-600">Equipment</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.equipment}
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
                    {data.pickup.location.city}, {data.pickup.location.state}
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
                    {data.pickup.date.month}/{data.pickup.date.day}
                  </p>
                  <p className="text-sm text-gray-600">
                    {data.pickup.apointment.minTime} CDT
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Pickup #</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.pickup.number}
                  </p>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <Building className="h-4 w-4 text-gray-500 mr-2" />
                    <p className="text-sm text-gray-500">Facility Owner</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.pickup.facility.owner}
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
                    {data.dropoff.location.city}, {data.dropoff.location.state}
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
                    {data.dropoff.date.month}/{data.dropoff.date.day}
                  </p>
                  <p className="text-sm text-gray-600">
                    {data.pickup.apointment.minTime} CDT
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Dropoff #</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.dropoff.number}
                  </p>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <Building className="h-4 w-4 text-gray-500 mr-2" />
                    <p className="text-sm text-gray-500">Facility Owner</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.dropoff.facility.owner}
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
