import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { RegisterStepTwoData, FormErrors } from "../types";
import { authApi, handleApiError } from "../services/api";
import Layout from "./layout";
import { Loader2, Truck, Package, MapPin, CheckCircle } from "lucide-react";
import { AxiosError } from "axios";
import { useAuth } from "../hooks/use-auth";

const SignUpStep2: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const { user } = useAuth();

  const [formData, setFormData] = useState<RegisterStepTwoData>({
    company_location: "MISSOURI",
    mode: [],
    average_ftl: "1-5",
    trailer_type: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/sign-up");
      return;
    }

    setFirstName(user.first_name);
    setCompanyName(user.company?.name || "");
    setFormData((prev) => ({ ...prev, user_id: user.id }));
  }, [user, navigate]);

  const handleCheckboxChange = (
    name: "mode" | "trailer_type",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter((item) => item !== value)
        : [...prev[name], value],
    }));

    // Clear error when user makes selection
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (formData.mode.length === 0) {
      newErrors.mode = "Please select at least one mode type";
    }

    if (formData.trailer_type.length === 0) {
      newErrors.trailer_type = "Please select at least one trailer type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await authApi.registerStepTwo(formData);

      navigate("/sign-up-3");
    } catch (error) {
      if (error instanceof AxiosError) {
        const apiError = handleApiError(error);
        if (apiError.errors) {
          setErrors(apiError.errors);
        } else {
          setErrors({ general: apiError.message });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Truck className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-extrabold text-gray-900">
              Join ShipOrbit
            </h1>
            <p className="mt-2 text-gray-600">
              Tell us about your shipping needs
            </p>
          </div>

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
                    Nice to meet you, {firstName}
                  </h2>
                  <p className="text-gray-600">
                    Tell us about {companyName}'s shipping needs. Right now, we
                    focus on 53' dry van and reefer full truckloads.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {errors.general && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                      {errors.general}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        name="company_location"
                        value={formData.company_location}
                        onChange={handleSelectChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="MISSOURI">Missouri</option>
                        <option value="CALIFORNIA">California</option>
                        <option value="TEXAS">Texas</option>
                        <option value="FLORIDA">Florida</option>
                        <option value="NEW_YORK">New York</option>
                        <option value="ILLINOIS">Illinois</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Mode type (Select all that apply)
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="FTL"
                          checked={formData.mode.includes("FTL")}
                          onChange={() => handleCheckboxChange("mode", "FTL")}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label
                          htmlFor="FTL"
                          className="ml-3 text-sm text-gray-700"
                        >
                          53' Full truckloads (FTL)
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="LTL"
                          checked={formData.mode.includes("LTL")}
                          onChange={() => handleCheckboxChange("mode", "LTL")}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label
                          htmlFor="LTL"
                          className="ml-3 text-sm text-gray-700"
                        >
                          53' Less-than-truckloads (LTL)
                        </label>
                      </div>
                    </div>
                    {errors.mode && (
                      <p className="mt-1 text-sm text-red-600">{errors.mode}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Average FTL shipment volume per month
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Package className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        name="average_ftl"
                        value={formData.average_ftl}
                        onChange={handleSelectChange}
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
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Trailer type (Select all that apply)
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="dryVan"
                          checked={formData.trailer_type.includes("dryVan")}
                          onChange={() =>
                            handleCheckboxChange("trailer_type", "dryVan")
                          }
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label
                          htmlFor="dryVan"
                          className="ml-3 text-sm text-gray-700"
                        >
                          53' Dry van
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="reefer"
                          checked={formData.trailer_type.includes("reefer")}
                          onChange={() =>
                            handleCheckboxChange("trailer_type", "reefer")
                          }
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label
                          htmlFor="reefer"
                          className="ml-3 text-sm text-gray-700"
                        >
                          53' Reefer
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="flatbed"
                          checked={formData.trailer_type.includes("flatbed")}
                          onChange={() =>
                            handleCheckboxChange("trailer_type", "flatbed")
                          }
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label
                          htmlFor="flatbed"
                          className="ml-3 text-sm text-gray-700"
                        >
                          Flatbed
                        </label>
                      </div>
                    </div>
                    {errors.trailer_type && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.trailer_type}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Get started"
                    )}
                  </button>
                </form>
              </div>

              {/* Right side - Image */}
              <div className="lg:w-1/3 bg-gradient-to-br from-blue-600 to-indigo-700">
                <div className="h-full flex items-center justify-center p-8">
                  <img
                    src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="Shipping containers"
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignUpStep2;
