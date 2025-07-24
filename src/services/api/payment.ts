import type { AxiosResponse } from "axios";
import api from ".";
import type {
  ConfirmPaymentData,
  ConfirmPaymentResult,
  CreatePaymentIntentData,
  Invoice,
  PaymentIntent,
} from "../../types";

export const paymentApi = {
  getInvoices: async () => {
    const response: AxiosResponse<{ results: Invoice[] }> = await api.get(
      "/invoices/"
    );
    return response.data;
  },
  getPaymentMethods: async () => {
    const response: AxiosResponse<{ results: Invoice[] }> = await api.post(
      "/payment-methods/"
    );
    return response.data;
  },
  createPaymentIntent: async (data: CreatePaymentIntentData) => {
    const response: AxiosResponse<PaymentIntent> = await api.post(
      "/payments/create-intent/",
      data
    );
    return response.data;
  },
  confirmPayment: async (data: ConfirmPaymentData) => {
    const response: AxiosResponse<ConfirmPaymentResult> = await api.post(
      "/payments/confirm/",
      data
    );
    return response.data;
  },
};
