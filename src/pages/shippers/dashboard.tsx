import {
  Calendar,
  Clock,
  Loader2,
  MapPin,
  MoreHorizontal,
  Search,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import Layout from "./components/layout";
import { shipperApi } from "../../services/api/shipper";
import type { Shipment } from "../../types";
import { cn } from "../../utils/cn";

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

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [filteredShipments, setFilteredShipments] = useState<Shipment[]>([]);
  const [activeFilter, setActiveFilter] = useState<Shipment["status"] | "all">(
    "all"
  );
  const [loading, setLoading] = useState(true);
  const greeting = useMemo(() => getGreeting(), []);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const shipments = await shipperApi.getShipments();
        setShipments(shipments.results);
      } catch (error) {
        console.log({ error });
      } finally {
        setLoading(false);
      }
    };
    fetchShipments();
  }, []);

  useEffect(() => {
    switch (activeFilter) {
      case "all":
        setFilteredShipments(shipments);
        break;
      case "unfinished":
        setFilteredShipments(
          shipments.filter((shipment) => shipment.status === "unfinished")
        );
        break;
      case "upcoming":
        setFilteredShipments(
          shipments.filter((shipment) => shipment.status === "upcoming")
        );
        break;
      case "inprogress":
        setFilteredShipments(
          shipments.filter((shipment) => shipment.status === "inprogress")
        );
        break;
      case "past":
        setFilteredShipments(
          shipments.filter((shipment) => shipment.status === "past")
        );
        break;
    }
  }, [activeFilter, shipments]);

  const counts = {
    all: shipments.length,
    unfinished: shipments.filter((s) => s.status === "unfinished").length,
    inprogress: shipments.filter((s) => s.status === "inprogress").length,
    upcoming: shipments.filter((s) => s.status === "upcoming").length,
    past: shipments.filter((s) => s.status === "past").length,
  };

  return (
    <Layout>
      {/* Welcome Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">
            <span className="text-gray-500">{greeting}, </span>
            {user?.first_name}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Filter shipments"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="space-y-3">
              <div
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => setActiveFilter("all")}
              >
                <span
                  className={cn(
                    "text-gray-700",
                    activeFilter === "all" && "text-blue-600 font-medium"
                  )}
                >
                  All
                </span>
                <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                  {counts.all}
                </span>
              </div>
              <div
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => setActiveFilter("unfinished")}
              >
                <span
                  className={cn(
                    "text-gray-700",
                    activeFilter === "unfinished" && "text-blue-600 font-medium"
                  )}
                >
                  Unfinished
                </span>
                <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full">
                  {counts.unfinished}
                </span>
              </div>
              <div
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => setActiveFilter("inprogress")}
              >
                <span
                  className={cn(
                    "text-gray-700",
                    activeFilter === "inprogress" && "text-blue-600 font-medium"
                  )}
                >
                  In Progress
                </span>
                <span className="bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded-full">
                  {counts.inprogress}
                </span>
              </div>
              <div
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => setActiveFilter("upcoming")}
              >
                <span
                  className={cn(
                    "text-gray-700",
                    activeFilter === "upcoming" && "text-blue-600 font-medium"
                  )}
                >
                  Upcoming
                </span>
                <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                  {counts.upcoming}
                </span>
              </div>
              <div
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => setActiveFilter("past")}
              >
                <span
                  className={cn(
                    "text-gray-700",
                    activeFilter === "past" && "text-blue-600 font-medium"
                  )}
                >
                  Past
                </span>
                <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
                  {counts.past}
                </span>
              </div>
            </div>
          </div>

          {/* Shipments List */}
          {loading ? (
            <div className="lg:col-span-3 h-full flex items-center justify-center">
              <Loader2 className="animate-spin" />{" "}
            </div>
          ) : (
            <div className="lg:col-span-3">
              <div className="space-y-4">
                {filteredShipments.map((shipment) => (
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
                          <span className="text-sm text-gray-500">
                            Finalizing details
                          </span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Route */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Status */}
                        <div className="flex flex-col items-center md:items-start">
                          <p className="text-sm text-gray-500 mb-1">Status</p>
                          <h4 className="text-lg font-semibold text-gray-900 mb-1">
                            Finalizing details
                          </h4>
                          <p className="text-sm text-gray-500">
                            {shipment.finalizeDate}
                          </p>
                        </div>

                        {/* Pickup */}
                        <div className="flex flex-col items-center md:items-start">
                          <div className="flex items-center mb-2">
                            <MapPin className="h-4 w-4 text-blue-600 mr-2" />
                            <span className="text-sm text-gray-500">
                              Pickup
                            </span>
                          </div>
                          <h5 className="text-lg font-semibold text-gray-900 mb-1">
                            {shipment.pickup.city.name},{" "}
                            {shipment.pickup.city.region_code}
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
                            <span className="text-sm text-gray-500">
                              Dropoff
                            </span>
                          </div>
                          <h5 className="text-lg font-semibold text-gray-900 mb-1">
                            {shipment.dropoff.city.name},{" "}
                            {shipment.dropoff.city.region_code}
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
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
