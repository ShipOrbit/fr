import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Shield, AlertCircle } from "lucide-react";
import { useState } from "react";
import { paymentApi } from "../services/api/payment";
import type { Shipment } from "../types";
import Button from "./button";
import { AxiosError } from "axios";
import { handleApiError } from "../services/api/auth";
import toast from "react-hot-toast";

export type CheckoutFormProps = {
  shipment: Shipment;
  onPaymentSuccess: () => void;
};

const CheckoutForm = ({ shipment, onPaymentSuccess }: CheckoutFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(undefined);

    if (!stripe || !elements) return;

    const cardNumber = elements.getElement(CardElement);

    if (!cardNumber) {
      setError("Card number input not found.");
      return;
    }

    setIsSubmitting(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumber,
    });

    if (error) {
      setError(error.message);
      setIsSubmitting(false);
    } else {
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
        if (error instanceof AxiosError) {
          const apiError = handleApiError(error);
          console.log(apiError.errors);
          if (apiError.errors) {
            Object.entries(apiError.errors).forEach((pair) =>
              toast.error(pair[1].toString(), { duration: 10000 })
            );
          } else if (apiError.message) {
            setError(apiError.message);
          }
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-6">
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

        <Button
          loading={isSubmitting}
          type="submit"
        >{`Pay $${shipment.total_price}`}</Button>
      </div>
    </form>
  );
};
export default CheckoutForm;
