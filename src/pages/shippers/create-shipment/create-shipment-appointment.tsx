import {
  Building,
  Calendar,
  Clock,
  HandHeart,
  Loader2,
  MapPin,
  X,
} from "lucide-react";
import React, { useEffect, useState, type PropsWithChildren } from "react";
import Header from "../components/header";
import { shipperApi } from "../../../services/api/shipper";
import type { Facility, Shipment } from "../../../types";
import { Link, useParams } from "react-router";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type ModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
};

const facilitySchema = z.object({
  facility_name: z.string().min(1, "Facility name is required"),
  facility_address: z.string().min(1, "Address is required"),
  zip_code: z.string().min(4, "Zip code is too short"),
  scheduling_preference: z.enum([
    "first_come",
    "already_scheduled",
    "to_be_scheduled",
  ]),
  contact_name: z.string().min(1, "Contact name is required"),
  phone_number: z.string().min(7, "Invalid phone number"),
  email: z.string().email("Invalid email address"),
});

type FacilityFormData = z.infer<typeof facilitySchema>;

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

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

const CreateShipmentAppointment: React.FC = () => {
  const [showPickupModal, setShowPickupModal] = useState(false);
  const [showDropoffModal, setShowDropoffModal] = useState(false);
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;

    const fetchShipment = async () => {
      try {
        const shipment = await shipperApi.getShipmentById({ id });
        console.log({ shipment });
        setShipment(shipment);
      } catch (error) {
        console.log(error);
      }
    };
    fetchShipment();
  }, [id]);

  if (!shipment) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader2 className="animate-spin" />;
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Appointment Times */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Confirm appointment times
              </h2>

              {/* Pickup */}
              <div className="mb-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {shipment.pickup.city.name},{" "}
                        {shipment.pickup.city.region_code}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Date: {shipment.pickup.date}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPickupModal(true)}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    <Building className="h-4 w-4" />
                    <span>Add facility info</span>
                  </button>
                </div>
              </div>

              {/* Transit Info */}
              <div className="text-center py-4">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>
                    {shipment.miles}mi ({shipment?.min_transit_time} hr transit
                    time)
                  </span>
                </div>
              </div>

              {/* Dropoff */}
              <div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <MapPin className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {shipment.dropoff.city.name},{" "}
                        {shipment.dropoff.city.region_code}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Date: {shipment.dropoff.date}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDropoffModal(true)}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    <Building className="h-4 w-4" />
                    <span>Add facility info</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Driver Assist */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <input
                    type="checkbox"
                    id="driver-assist"
                    checked={shipment.driver_assist}
                    onChange={async (e) => {
                      setShipment((prev) => ({
                        ...prev!,
                        driver_assist: e.target.checked,
                      }));
                      await shipperApi.updateShipmentAppointment(shipment.id, {
                        driver_assist: e.target.checked,
                      });
                    }}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="driver-assist"
                    className="block text-lg font-semibold text-gray-900 mb-2"
                  >
                    Driver assist
                  </label>
                  <p className="text-sm text-gray-600">
                    Your driver will help move pallets and load/unload the
                    truck.
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-blue-600">
                  <HandHeart className="h-5 w-5" />
                  <span className="text-sm font-medium">+$150</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Pricing */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Total</h3>
                <div className="text-2xl font-bold text-blue-600">
                  ${shipment?.base_price + (shipment.driver_assist ? 150 : 0)}
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
                    <span className="font-medium">$150</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Link
                  to={`/shipments/${shipment.id}/finalizing`}
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Book shipment
                </Link>
                <p className="text-center text-sm text-gray-600">
                  Add final details in the next step
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <Modal
        isOpen={showPickupModal}
        onClose={() => setShowPickupModal(false)}
        title={`Pick-up - ${shipment.pickup.date}`}
      >
        <FacilityForm
          shipment={shipment}
          type="pickup"
          date={shipment.pickup.date}
          updateShipmentState={(facility) =>
            setShipment((prev) => ({
              ...prev!,
              pickup: { ...prev!.pickup, ...facility },
            }))
          }
          onClose={() => setShowPickupModal(false)}
        />
      </Modal>

      <Modal
        isOpen={showDropoffModal}
        onClose={() => setShowDropoffModal(false)}
        title={`Drop-off - ${shipment.dropoff.date}`}
      >
        <FacilityForm
          shipment={shipment}
          type="dropoff"
          date={shipment.dropoff.date}
          updateShipmentState={(facility) =>
            setShipment((prev) => ({
              ...prev!,
              dropoff: { ...prev!.dropoff, ...facility },
            }))
          }
          onClose={() => setShowDropoffModal(false)}
        />
      </Modal>
    </div>
  );
};

export default CreateShipmentAppointment;
