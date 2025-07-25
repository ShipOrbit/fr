import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Package } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { shipperApi } from "../../services/api/shipper";
import type { Shipment } from "../../types";
import normalizeDefaultValue from "../../utils/normalize-default-value";
import Button from "../button";
import { type ShipmentFormValues, shipmentSchema } from "./schema";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { handleApiError } from "../../services/api/auth";

export type ShipmentFinalizeFormProps = { shipment: Shipment };

export default function ShipmentFinalizeForm({
  shipment,
}: ShipmentFinalizeFormProps) {
  const [status, setStatus] = useState<"saving" | "finalizing" | "idle">(
    "idle"
  );
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    setError,
  } = useForm<ShipmentFormValues>({
    resolver: zodResolver(shipmentSchema),
    defaultValues: {
      reference_number: shipment.reference_number,
      weight: normalizeDefaultValue(shipment.weight),
      commodity: shipment.commodity,
      packaging: normalizeDefaultValue(shipment.packaging),
      packaging_type: shipment.packaging_type,
      pickup_number: shipment.pickup.location_number,
      pickup_notes: shipment.pickup.additional_notes,
      dropoff_number: shipment.dropoff.location_number,
      dropoff_notes: shipment.dropoff.additional_notes,
    },
    disabled: status != "idle",
  });

  const handleSaveShipment: React.FormEventHandler<HTMLFormElement> =
    handleSubmit(async (data) => {
      try {
        setStatus("saving");
        await shipperApi.updateShipmentFinalizing(shipment.id, data);
        toast.success("Shipment Saved.");
      } catch (error) {
        if (error instanceof AxiosError) {
          const apiError = handleApiError(error);
          if (apiError.errors) {
            Object.entries(apiError.errors).forEach(([field, message]) => {
              setError(field as keyof ShipmentFormValues, {
                type: "server",
                message: message as unknown as string,
              });
            });
          } else {
            toast.error(apiError.message);
          }
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Something Went Wrong, Try Again Later.");
        }
      } finally {
        setStatus("idle");
      }
    });

  const handleFinalizeShipment = async () => {
    try {
      setStatus("finalizing");
      const formIsValid = await trigger();
      if (formIsValid) {
        const data = getValues();
        await shipperApi.updateShipmentFinalizing(shipment.id, data);
        navigate(`/shipments/${shipment.id}/checkout`);
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setStatus("idle");
    }
  };

  return (
    <form onSubmit={handleSaveShipment}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Section */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Finalize shipping details
                  </h1>
                  <p className="text-gray-600 mt-1">
                    We just need a bit more information to move your shipment
                  </p>
                </div>
              </div>
            </div>

            <div className="px-8 py-6 space-y-8">
              {/* Shipment Section */}
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <Package className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Shipment
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="reference_number"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Customer reference number
                    </label>
                    <input
                      type="text"
                      id="reference_number"
                      {...register("reference_number")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.reference_number && (
                      <p className="text-sm text-red-500">
                        {errors.reference_number.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="weight"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Weight
                    </label>
                    <input
                      type="number"
                      id="weight"
                      {...register("weight", { valueAsNumber: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.weight && (
                      <p className="text-sm text-red-500">
                        {errors.weight.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
                  <div className="md:col-span-6">
                    <label
                      htmlFor="commodity"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Commodity
                    </label>
                    <input
                      type="text"
                      id="commodity"
                      {...register("commodity")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.commodity && (
                      <p className="text-sm text-red-500">
                        {errors.commodity.message}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="packaging"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Packaging
                    </label>
                    <input
                      type="number"
                      id="packaging"
                      {...register("packaging", { valueAsNumber: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.packaging && (
                      <p className="text-sm text-red-500">
                        {errors.packaging.message}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-4">
                    <label
                      htmlFor="packaging_type"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Packaging type
                    </label>
                    <input
                      type="text"
                      id="packaging_type"
                      {...register("packaging_type")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.packaging_type && (
                      <p className="text-sm text-red-500">
                        {errors.packaging_type.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Pickup Section */}
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <MapPin className="h-6 w-6 text-green-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Pickup
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="pickup_number"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Pickup number
                    </label>
                    <input
                      type="text"
                      id="pickup_number"
                      {...register("pickup_number")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.pickup_number && (
                      <p className="text-sm text-red-500">
                        {errors.pickup_number.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="pickup_notes"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Additional notes
                  </label>
                  <textarea
                    id="pickup_notes"
                    rows={5}
                    {...register("pickup_notes")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Let us know if there are any specifics we need to know about this facility"
                  />
                  {errors.pickup_notes && (
                    <p className="text-sm text-red-500">
                      {errors.pickup_notes.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Dropoff Section */}
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <MapPin className="h-6 w-6 text-red-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Dropoff
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="dropoff_number"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Dropoff number
                    </label>
                    <input
                      type="text"
                      id="dropoff_number"
                      {...register("dropoff_number")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.dropoff_number && (
                      <p className="text-sm text-red-500">
                        {errors.dropoff_number.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="dropoff_notes"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Additional notes
                  </label>
                  <textarea
                    id="dropoff_notes"
                    rows={5}
                    {...register("dropoff_notes")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Let us know if there are any specifics we need to know about this facility"
                  />
                  {errors.dropoff_notes && (
                    <p className="text-sm text-red-500">
                      {errors.dropoff_notes.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Total</h3>
              <div className="text-2xl font-bold text-blue-600">
                ${shipment.total_price}
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
                  <span className="font-medium">
                    ${shipment.driver_assist_fee}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <Button
                loading={status === "finalizing"}
                onClick={handleFinalizeShipment}
              >
                Finalize shipment
              </Button>
              <Button
                type="submit"
                className="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                loading={status === "saving"}
              >
                Save and finish later
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
