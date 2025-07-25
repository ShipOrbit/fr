import { Calendar, CheckCircle, Loader2, MapPin } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router";
import { useFetch } from "../../hooks/use-fetch";
import StripeProvider from "../../providers/stripe-provider";
import { shipperApi } from "../../services/api/shipper";
import Layout from "../components/layout";
import CheckoutForm from "../../components/checkout-form";

const CheckoutPage = () => {
  const [currentView, setCurrentView] = useState("checkout");
  const { id } = useParams<{ id: string }>();
  const { data: shipment, loading } = useFetch(() =>
    shipperApi.getShipmentById({ id: id! })
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!shipment) {
    return <Navigate to="/dashboard" />;
  }

  const handlePaymentSuccess = () => {
    setCurrentView("success");
  };

  if (currentView === "success") {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-4">
              Your shipment has been booked successfully.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Shipment ID: {shipment.id}
            </p>
            <Link
              to="/dashboard"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">
            Review your shipment details and complete payment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipment Details */}
          <div className="space-y-6">
            {/* Price Breakdown */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Price Breakdown
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Rate</span>
                  <span className="text-gray-900">${shipment.base_price}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Driver Fees</span>
                  <span className="text-gray-900">
                    $
                    {shipment.driver_assist
                      ? shipment.driver_assist_fee
                      : "0.00"}
                  </span>
                </div>

                <hr className="my-3" />

                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-blue-600">${shipment.total_price}</span>
                </div>
              </div>
            </div>
            {/* Pickup & Delivery */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                Pickup & Delivery
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Pickup Address
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {shipment.pickup.facility_address}
                    <br />
                    {shipment.pickup.city.name},{" "}
                    {shipment.pickup.city.region_code}{" "}
                    {shipment.pickup.zip_code}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Dropoff Address
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {shipment.dropoff.facility_address}
                    <br />
                    {shipment.dropoff.city.name},{" "}
                    {shipment.dropoff.city.region_code}{" "}
                    {shipment.dropoff.zip_code}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Timeline
              </h3>

              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium text-gray-900">Pickup Date</p>
                    <p className="text-sm text-gray-600">
                      {shipment.pickup.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-600 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Estimated Delivery
                    </p>
                    <p className="text-sm text-gray-600">
                      {shipment.min_transit_time}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="space-y-6">
            {/* Payment Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <StripeProvider>
                <CheckoutForm
                  shipment={shipment}
                  onPaymentSuccess={handlePaymentSuccess}
                />
              </StripeProvider>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
