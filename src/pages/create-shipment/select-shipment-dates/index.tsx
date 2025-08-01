import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  RotateCcw,
  Truck,
} from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { LocationSearchInput } from "../../../components/location-search-input";
import { shipperApi } from "../../../services/api/shipper";
import type { GeoDBCity, PriceCalculation } from "../../../types";
import { cn } from "../../../utils/cn";
import Layout from "../../../components/layout/app-layout";
import { type ShipmentFormValues, shipmentSchema } from "./schema";
import toast from "react-hot-toast";
import { handleApiError } from "../../../services/api/auth";
import { AxiosError } from "axios";
import Button from "../../../components/button";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const SelectDatePage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [equipment] = useState("dryVan");
  const [pickupLocation, setPickupLocation] = useState<GeoDBCity>();
  const [dropoffLocation, setDropoffLocation] = useState<GeoDBCity>();
  const [showEquipmentDropdown, setShowEquipmentDropdown] = useState(false);
  const [distancePrice, setDistancePrice] = useState<PriceCalculation | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);
  const {
    handleSubmit,
    setValue,
    register,
    watch,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<ShipmentFormValues>({
    resolver: zodResolver(shipmentSchema),
    defaultValues: {
      equipment: "dryVan",
      pickup_location: undefined,
      dropoff_location: undefined,
      pickup_date: "",
      dropoff_date: "",
    },
    disabled: isSubmitting,
  });
  const onPickLocationSelect = useCallback(
    (city: GeoDBCity) => {
      setPickupLocation(city);
      setValue("pickup_location", city.id);
      clearErrors("pickup_location");
    },
    [clearErrors, setValue]
  );

  const onDropoffLocationSelect = useCallback(
    (city: GeoDBCity) => {
      setDropoffLocation(city);
      setValue("dropoff_location", city.id);
      clearErrors("dropoff_location");
    },
    [clearErrors, setValue]
  );

  const onSubmit = async (data: ShipmentFormValues) => {
    try {
      setIsSubmitting(true);
      const shipment = await shipperApi.createShipment({
        equipment: data.equipment,
        pickup: { city: data.pickup_location, date: data.pickup_date },
        dropoff: { city: data.dropoff_location, date: data.dropoff_date },
      });
      navigate(`/shipments/${shipment.id}/appointment`);
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
      setIsSubmitting(false);
    }
  };

  const pickupDate = watch("pickup_date");
  const dropoffDate = watch("dropoff_date");

  useEffect(() => {
    if (pickupDate && distancePrice?.min_transit_time) {
      const pickup = new Date(pickupDate);
      const dropoff = new Date(pickup);
      dropoff.setDate(pickup.getDate() + distancePrice.min_transit_time);
      const formattedDate = dropoff.toISOString().split("T")[0];
      setValue("dropoff_date", formattedDate);
    }
  }, [distancePrice, setValue, pickupDate]);

  const getCities = useCallback(
    (search: string) => shipperApi.searchCities({ name_prefix: search }),
    []
  );

  useEffect(() => {
    const fetchDistancePrice = async () => {
      if (!pickupLocation || !dropoffLocation) {
        setDistancePrice(null);
        return;
      }
      setIsLoading(true);
      try {
        const result = await shipperApi.getDistancePrice({
          pickup_location: pickupLocation,
          dropoff_location: dropoffLocation,
          equipment,
        });
        setDistancePrice(result);
      } catch {
        setDistancePrice(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDistancePrice();
  }, [pickupLocation, dropoffLocation, equipment]);

  const calendarDays = Array.from({ length: 21 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);

    return {
      date: date.toISOString().split("T")[0], // 'YYYY-MM-DD'
      isCurrentMonth: date.getMonth() === new Date().getMonth(),
    };
  });

  return (
    <Layout>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Create Shipment
                  </h1>
                  <p className="text-gray-600">
                    Select dates and locations for your shipment
                  </p>
                </div>
              </div>

              {/* Equipment Dropdown */}
              <div className="relative">
                <button
                  onClick={() =>
                    setShowEquipmentDropdown(!showEquipmentDropdown)
                  }
                  className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg border border-gray-300 transition-colors"
                >
                  <Truck className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {equipment}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>

                {showEquipmentDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setValue("equipment", "dryVan");
                          setShowEquipmentDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Dry Van
                      </button>
                      <button
                        onClick={() => {
                          setValue("equipment", "reefer");
                          setShowEquipmentDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Reefer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-6">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Location and Date Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pick-up location
                  </label>
                  <LocationSearchInput
                    placeholder="City, State"
                    onSelect={onPickLocationSelect}
                    getCities={getCities}
                  />
                  {errors.pickup_location && (
                    <p className="text-red-500 text-sm">
                      {errors.pickup_location.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Drop-off location
                  </label>
                  <LocationSearchInput
                    placeholder="City, State"
                    onSelect={onDropoffLocationSelect}
                    getCities={getCities}
                  />
                  {errors.dropoff_location && (
                    <p className="text-red-500 text-sm">
                      {errors.dropoff_location.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pick-up date
                  </label>
                  <input
                    type="date"
                    disabled={!distancePrice}
                    min={today}
                    {...register("pickup_date")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  {errors.pickup_date && (
                    <p className="text-red-500 text-sm">
                      {errors.pickup_date.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Drop-off date
                  </label>
                  <input
                    type="date"
                    disabled
                    {...register("dropoff_date")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Calendar Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Select shipment dates
                  </h3>
                  <button
                    type="button"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                    onClick={() => {
                      setValue("pickup_date", "");
                      setValue("dropoff_date", "");
                    }}
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span className="text-sm font-medium">Reset dates</span>
                  </button>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {days.map((day) => (
                      <div
                        key={day}
                        className="text-center text-sm font-medium text-gray-700 py-2"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {calendarDays.map(({ date, isCurrentMonth }) => {
                      const isPickup = date === pickupDate;
                      const isDropoff = date === dropoffDate;

                      const isInRange =
                        pickupDate &&
                        dropoffDate &&
                        date > pickupDate &&
                        date < dropoffDate;

                      return (
                        <button
                          key={date}
                          onClick={() => setValue("pickup_date", date)}
                          type="button"
                          disabled={!distancePrice}
                          className={cn(
                            "h-10 w-10 mx-auto text-sm rounded-lg transition-colors",
                            {
                              "bg-blue-600 text-white": isPickup || isDropoff,
                              "bg-blue-100 text-blue-800": isInRange,
                              "hover:bg-blue-50 hover:text-blue-600":
                                !isPickup && !isDropoff && !isInRange,
                              "text-gray-400": !isCurrentMonth,
                            }
                          )}
                        >
                          {new Date(date).getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Summary and Submit */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Distance</p>
                    <p className="text-lg font-bold text-green-600">
                      {isLoading
                        ? "Loading..."
                        : distancePrice
                        ? `${distancePrice.miles} mi`
                        : "-- mi"}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Transit Time</p>
                    <p className="text-lg font-bold text-green-600">
                      {isLoading
                        ? "Loading..."
                        : distancePrice
                        ? `${distancePrice.min_transit_time} days`
                        : "-- days"}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="text-lg font-bold text-green-600">
                      {isLoading
                        ? "Loading..."
                        : distancePrice
                        ? `$${distancePrice.base_price}`
                        : "$--"}
                    </p>
                  </div>
                  <Button
                    className="ml-auto"
                    type="submit"
                    loading={isSubmitting}
                  >
                    <span>Review shipment</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default SelectDatePage;
