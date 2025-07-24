import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Loader2,
  MapPin,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router";
import { useFetch } from "../../hooks/use-fetch";
import StripeProvider from "../../providers/stripe-provider";
import { paymentApi } from "../../services/api/payment";
import { shipperApi } from "../../services/api/shipper";
import type { Shipment } from "../../types";
import Layout from "../shippers/components/layout";

type CheckoutFormProps = {
  shipment: Shipment;
  onPaymentSuccess: () => void;
};

const CheckoutForm = ({ shipment, onPaymentSuccess }: CheckoutFormProps) => {
  const [error, setError] = useState<string>();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardNumber = elements.getElement(CardElement);

    if (!cardNumber) {
      setError("Card number input not found.");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumber,
    });

    if (error) {
      console.error(error.message);
      setError(error.message);
    } else {
      setError(undefined);
      try {
        const result = await paymentApi.createPaymentIntent({
          payment_method_id: paymentMethod.id,
          shipment_id: shipment.id,
        });

        if (result.requires_action) {
          const { error } = await stripe.handleCardAction(result.client_secret);

          if (!error) {
            const confirmResult = await paymentApi.confirmPayment({
              payment_intent_id: result.payment.stripe_payment_intent_id,
            });

            if (confirmResult.payment.status === "succeeded") {
              onPaymentSuccess();
            }
          }
        } else if (result.status === "succeeded") {
          onPaymentSuccess();
        }
      } catch (error) {
        console.log({ error });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Payment Method
          </h3>
        </div>

        <CardElement />

        <div className="flex items-center p-4 bg-blue-50 rounded-lg">
          <Shield className="h-5 w-5 text-blue-600 mr-3" />
          <div className="text-sm text-blue-800">
            <p className="font-medium">Your payment is secure</p>
            <p>Protected by 256-bit SSL encryption</p>
          </div>
        </div>

        {error && (
          <div className="flex items-center p-4 bg-red-50 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {`Pay $${shipment.total_price}`}
        </button>
      </div>
    </form>
  );
};

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

            {/* Terms and Conditions */}
            <div className="text-xs text-gray-500 text-center">
              By completing this payment, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
