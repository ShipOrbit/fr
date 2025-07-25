import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  type FacilityFormData,
  facilitySchema,
} from "../pages/create-shipment/create-shipment-appointment/schema";
import { shipperApi } from "../services/api/shipper";
import type { Shipment, Facility } from "../types";

const FacilityForm = ({
  type,
  shipment,
  updateShipmentState,
  onClose,
}: {
  type: "pickup" | "dropoff";
  date: string;
  shipment: Shipment;
  updateShipmentState: (facility: Facility) => void;
  onClose: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FacilityFormData>({
    resolver: zodResolver(facilitySchema),
    defaultValues: {
      facility_name: shipment[type].facility_name,
      facility_address: shipment[type].facility_address,
      zip_code: shipment[type].zip_code,
      scheduling_preference:
        shipment[type].scheduling_preference || "first_come",
      email: shipment[type].email,
      contact_name: shipment[type].contact_name,
      phone_number: shipment[type].phone_number,
    },
    disabled: loading,
  });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = handleSubmit(
    async (data) => {
      try {
        setLoading(true);
        await shipperApi.updateShipmentAppointment(shipment.id, {
          [type]: data,
        });
        updateShipmentState(data);
        onClose();
      } catch (error) {
        console.log({ error });
      } finally {
        setLoading(false);
      }
    }
  );

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Facility name or owner
        </label>
        {/* <input type="text" placeholder="Enter facility name" /> */}
        <input
          type="text"
          {...register("facility_name")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter facility name"
        />
        {errors.facility_name && (
          <p className="text-sm text-red-500">{errors.facility_name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Facility address
        </label>
        <input
          type="text"
          {...register("facility_address")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter street address"
        />
        {errors.facility_address && (
          <p className="text-sm text-red-500">
            {errors.facility_address.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Town/City
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
          value={
            type === "pickup"
              ? shipment.pickup.city.name
              : shipment.dropoff.city.name
          }
          disabled
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State/County
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            value={
              type === "pickup"
                ? shipment.pickup.city.region_code
                : shipment.dropoff.city.region_code
            }
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Postcode
          </label>
          <input
            type="text"
            {...register("zip_code")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="12345"
          />
          {errors.zip_code && (
            <p className="text-sm text-red-500">{errors.zip_code.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Facility scheduling preference
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              value="first_come"
              {...register("scheduling_preference")}
            />
            <span className="ml-2 text-sm text-gray-700">
              First come, first served
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="already_scheduled"
              {...register("scheduling_preference")}
            />
            <span className="ml-2 text-sm text-gray-700">
              Appointment already scheduled
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="to_be_scheduled"
              {...register("scheduling_preference")}
            />
            <span className="ml-2 text-sm text-gray-700">
              Appointment to be scheduled by ShipOrbit
            </span>
          </label>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-md font-semibold text-gray-900 mb-4">
          Facility contact information
        </h4>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facility contact name
            </label>
            <input
              type="text"
              {...register("contact_name")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Contact name"
            />
            {errors.contact_name && (
              <p className="text-sm text-red-500">
                {errors.contact_name.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone number
              </label>
              <input
                type="tel"
                {...register("phone_number")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="(555) 123-4567"
              />
              {errors.phone_number && (
                <p className="text-sm text-red-500">
                  {errors.phone_number.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>

              <input
                type="email"
                {...register("email")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="contact@facility.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Submit"}
        </button>
      </div>
    </form>
  );
};
export default FacilityForm;
