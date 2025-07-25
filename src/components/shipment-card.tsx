// components/ShipmentCard.tsx

import { Calendar, Clock, MapPin, MoreHorizontal } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import type { Shipment } from "../types";
import { Link } from "react-router";

const getStatusColor = (status: string) => {
  switch (status) {
    case "upcoming":
      return "bg-blue-100 text-blue-800";
    case "inprogress":
      return "bg-yellow-100 text-yellow-800";
    case "past":
      return "bg-green-100 text-green-800";
    case "unfinshed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

interface ShipmentCardProps {
  shipment: Shipment;
}

const ShipmentCard: React.FC<ShipmentCardProps> = ({ shipment }) => {
  const [showOptions, setShowOptions] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      key={shipment.id}
      className="bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                shipment.status
              )}`}
            >
              {shipment.status.charAt(0).toUpperCase() +
                shipment.status.slice(1)}
            </span>
            <span className="text-sm text-gray-500">Finalizing details</span>
          </div>
          {/* <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="h-5 w-5" />
          </button> */}
          <div className="relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="text-gray-400 hover:text-gray-600"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>

            {showOptions && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10"
              >
                <div className="py-1">
                  <Link
                    to={`/shipments/${shipment.id}`}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => {
                      console.log("Cancel Shipment clicked");
                      setShowOptions(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                  >
                    Cancel Shipment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Route */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Status */}
          <div className="flex flex-col items-center md:items-start">
            <p className="text-sm text-gray-500 mb-1">Status</p>
            <h4 className="text-lg font-semibold text-gray-900 mb-1">
              Finalizing details
            </h4>
            <p className="text-sm text-gray-500">{shipment.finalizeDate}</p>
          </div>

          {/* Pickup */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-2">
              <MapPin className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm text-gray-500">Pickup</span>
            </div>
            <h5 className="text-lg font-semibold text-gray-900 mb-1">
              {shipment.pickup.city.name}, {shipment.pickup.city.region_code}
            </h5>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(shipment.pickup.date).getDate()}/
              {new Date(shipment.pickup.date).getMonth() + 1}
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Clock className="h-4 w-4 mr-1" />
              -- PM UTC – -- PM UTC
            </div>
          </div>

          {/* Dropoff */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-2">
              <MapPin className="h-4 w-4 text-red-600 mr-2" />
              <span className="text-sm text-gray-500">Dropoff</span>
            </div>
            <h5 className="text-lg font-semibold text-gray-900 mb-1">
              {shipment.dropoff.city.name}, {shipment.dropoff.city.region_code}
            </h5>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(shipment.dropoff.date).getDate()}/
              {new Date(shipment.dropoff.date).getMonth() + 1}
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Clock className="h-4 w-4 mr-1" />
              -- PM UTC – -- PM UTC
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentCard;
