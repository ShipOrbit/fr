import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { CheckCircle, Loader2, MapPin, Package, Search } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Layout from "../../components/layout";
import { useAuth } from "../../hooks/use-auth";
import { handleApiError } from "../../services/api/auth";
import { shipperApi } from "../../services/api/shipper";
import type { GeoDBRegion } from "../../types";
import { shippingNeedsSchema } from "./schema";

type ShippingNeedsFormData = z.infer<typeof shippingNeedsSchema>;

const ShippingNeeds: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cities, setCities] = useState<GeoDBRegion[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (user?.shipping_needs) {
      navigate("/sign-up-3");
    }
  }, [navigate, user]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<ShippingNeedsFormData>({
    resolver: zodResolver(shippingNeedsSchema),
    defaultValues: {
      company_location: "",
      mode: [],
      average_ftl: "1-5",
      trailer_type: [],
      user_id: undefined,
    },
  });

  const watchedMode = watch("mode");
  const watchedTrailerType = watch("trailer_type");

  // Search for cities using GeoDB API
  const searchCities = useCallback(
    async (query: string) => {
      if (!query.trim() || query.length < 2) {
        setCities([]);
        return;
      }

      setIsLoadingCities(true);
      try {
        const response = await shipperApi.getCountryRegions({
          search_Term: searchTerm,
        });

        setCities(response || []);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setCities([]);
      } finally {
        setIsLoadingCities(false);
      }
    },
    [searchTerm]
  );

  // Debounced search effect
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm) {
        searchCities(searchTerm);
      } else {
        setCities([]);
      }
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [searchCities, searchTerm]);

  const handleLocationSelect = (city: GeoDBRegion) => {
    const locationValue = `${city.name}, ${city.countryCode}`;
    setValue("company_location", locationValue);
    setSearchTerm(locationValue);
    setShowDropdown(false);
    setCities([]);
    clearErrors("company_location");
  };

  const handleCheckboxChange = (
    name: "mode" | "trailer_type",
    value: string,
    checked: boolean
  ) => {
    const currentValues = name === "mode" ? watchedMode : watchedTrailerType;
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((item) => item !== value);

    setValue(name, newValues);
    clearErrors(name);
  };

  const onSubmit = async (data: ShippingNeedsFormData) => {
    try {
      clearErrors("root");
      await shipperApi.createShippingNeeds(data);
      navigate("/sign-up-3");
    } catch (error) {
      if (error instanceof AxiosError) {
        const apiError = handleApiError(error);
        if (apiError.errors) {
          Object.entries(apiError.errors).forEach(([field, message]) => {
            setError(field as keyof ShippingNeedsFormData, {
              type: "server",
              message: message as unknown as string,
            });
          });
        } else {
          setError("root", {
            type: "server",
            message: apiError.message,
          });
        }
      } else {
        setError("root", {
          type: "server",
          message: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="lg:flex">
              {/* Left side - Progress and Form */}
              <div className="lg:w-2/3 p-8">
                {/* Progress Steps */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        Contact Info
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white text-xs font-bold">2</span>
                      </div>
                      <span className="text-sm font-medium text-blue-600">
                        Shipping Needs
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-6 w-6 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                        <span className="text-gray-500 text-xs font-bold">
                          3
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-500">
                        Account Creation
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "66%" }}
                    ></div>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Nice to meet you, {user?.first_name}
                  </h2>
                  <p className="text-gray-600">
                    Tell us about {user?.company?.name}'s shipping needs. Right
                    now, we focus on 53' dry van and reefer full truckloads.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {errors.root && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                      {errors.root.message}
                    </div>
                  )}

                  {/* Company Location with GeoDB Search */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setShowDropdown(true);
                          if (!e.target.value.trim()) {
                            setValue("company_location", "");
                          }
                        }}
                        onFocus={() => setShowDropdown(true)}
                        className={`block w-full pl-10 pr-10 py-2 border ${
                          errors.company_location
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="Search for your city..."
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        {isLoadingCities ? (
                          <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
                        ) : (
                          <Search className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </div>

                    {/* Dropdown for city suggestions */}
                    {showDropdown && cities.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {cities.map((city) => (
                          <button
                            key={city.id}
                            type="button"
                            onClick={() => handleLocationSelect(city)}
                            className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                          >
                            <div className="font-medium text-gray-900">
                              {city.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {city.name}, {city.countryCode}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {errors.company_location && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.company_location.message}
                      </p>
                    )}
                  </div>

                  {/* Mode Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Mode type (Select all that apply)
                    </label>
                    <div className="space-y-3">
                      {[
                        { value: "FTL", label: "53' Full truckloads (FTL)" },
                        {
                          value: "LTL",
                          label: "53' Less-than-truckloads (LTL)",
                        },
                      ].map((option) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            type="checkbox"
                            id={option.value}
                            checked={watchedMode.includes(option.value)}
                            onChange={(e) =>
                              handleCheckboxChange(
                                "mode",
                                option.value,
                                e.target.checked
                              )
                            }
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label
                            htmlFor={option.value}
                            className="ml-3 text-sm text-gray-700"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.mode && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.mode.message}
                      </p>
                    )}
                  </div>

                  {/* Average FTL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Average FTL shipment volume per month
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Package className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        {...register("average_ftl")}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="1-5">1-5</option>
                        <option value="5-10">5-10</option>
                        <option value="15-25">15-25</option>
                        <option value="30-45">30-45</option>
                        <option value="50-70">50-70</option>
                        <option value="80-100">80-100</option>
                      </select>
                    </div>
                    {errors.average_ftl && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.average_ftl.message}
                      </p>
                    )}
                  </div>

                  {/* Trailer Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Trailer type (Select all that apply)
                    </label>
                    <div className="space-y-3">
                      {[
                        { value: "dryVan", label: "53' Dry van" },
                        { value: "reefer", label: "53' Reefer" },
                        { value: "flatbed", label: "Flatbed" },
                      ].map((option) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            type="checkbox"
                            id={option.value}
                            checked={watchedTrailerType.includes(option.value)}
                            onChange={(e) =>
                              handleCheckboxChange(
                                "trailer_type",
                                option.value,
                                e.target.checked
                              )
                            }
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label
                            htmlFor={option.value}
                            className="ml-3 text-sm text-gray-700"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.trailer_type && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.trailer_type.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Get started"
                    )}
                  </button>
                </form>
              </div>

              {/* Right side - Image */}
              <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white">
                <div className="h-full flex flex-col">
                  <div className="text-center mb-8">
                    <Package className="h-12 w-12 text-white mx-auto mb-4" />
                    <h1 className="text-3xl font-extrabold text-white">
                      Join ShipOrbit
                    </h1>
                    <p className="mt-2 text-white">
                      Tell us about your shipping needs
                    </p>
                  </div>
                  <div className="mb-8">
                    <img
                      src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                      alt="Logistics Dashboard"
                      className="rounded-lg shadow-lg mb-6"
                    />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">We offer</h3>
                      <p className="text-xl font-bold">
                        Easy and reliable shipping.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-start space-x-3">
                        <span className="text-blue-300 font-mono text-sm">
                          01.
                        </span>
                        <div>
                          <h4 className="font-semibold">
                            Business at a glance
                          </h4>
                          <p className="text-blue-100 text-sm">
                            Monitor your shipments in real-time
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <span className="text-blue-300 font-mono text-sm">
                          02.
                        </span>
                        <div>
                          <h4 className="font-semibold">Pick your price</h4>
                          <p className="text-blue-100 text-sm">
                            Competitive rates for all your needs
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <span className="text-blue-300 font-mono text-sm">
                          03.
                        </span>
                        <div>
                          <h4 className="font-semibold">Ship your way 24/7</h4>
                          <p className="text-blue-100 text-sm">
                            Round-the-clock support and tracking
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingNeeds;
