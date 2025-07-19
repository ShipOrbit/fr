import { Calendar, Clock, MapPin, MoreHorizontal, Search } from "lucide-react";
import React from "react";
import { useAuth } from "../../hooks/use-auth";
import Layout from "./components/layout";

interface Shipment {
  _id: string;
  status: "unfinshed" | "inprogress" | "upcoming" | "past";
  finalizeDate: string;
  pickup: {
    location: {
      city: string;
      state: string;
    };
    date: {
      month: string;
      day: string;
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
  };
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data
  const shipments: Shipment[] = [
    {
      _id: "1",
      status: "upcoming",
      finalizeDate: "2024-07-20",
      pickup: {
        location: { city: "Los Angeles", state: "CA" },
        date: { month: "07", day: "25" },
      },
      dropoff: {
        location: { city: "Phoenix", state: "AZ" },
        date: { month: "07", day: "27" },
      },
    },
    {
      _id: "2",
      status: "inprogress",
      finalizeDate: "2024-07-18",
      pickup: {
        location: { city: "Dallas", state: "TX" },
        date: { month: "07", day: "20" },
      },
      dropoff: {
        location: { city: "Houston", state: "TX" },
        date: { month: "07", day: "22" },
      },
    },
  ];

  const counts = {
    all: shipments.length,
    unfinshed: shipments.filter((s) => s.status === "unfinshed").length,
    inprogress: shipments.filter((s) => s.status === "inprogress").length,
    upcoming: shipments.filter((s) => s.status === "upcoming").length,
    past: shipments.filter((s) => s.status === "past").length,
  };

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

  return (
    <Layout>
      {/* Welcome Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">
            <span className="text-gray-500">Good evening, </span>
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
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                <span className="text-blue-600 font-medium">All</span>
                <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                  {counts.all}
                </span>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                <span className="text-gray-700">Unfinished</span>
                <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full">
                  {counts.unfinshed}
                </span>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                <span className="text-gray-700">In Progress</span>
                <span className="bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded-full">
                  {counts.inprogress}
                </span>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                <span className="text-gray-700">Upcoming</span>
                <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                  {counts.upcoming}
                </span>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                <span className="text-gray-700">Past</span>
                <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
                  {counts.past}
                </span>
              </div>
            </div>
          </div>

          {/* Shipments List */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {shipments.map((shipment) => (
                <div
                  key={shipment._id}
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
                          <span className="text-sm text-gray-500">Pickup</span>
                        </div>
                        <h5 className="text-lg font-semibold text-gray-900 mb-1">
                          {shipment.pickup.location.city},{" "}
                          {shipment.pickup.location.state}
                        </h5>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {shipment.pickup.date.month}/
                          {shipment.pickup.date.day}
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
                          {shipment.dropoff.location.city},{" "}
                          {shipment.dropoff.location.state}
                        </h5>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {shipment.dropoff.date.month}/
                          {shipment.dropoff.date.day}
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
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
