import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { AxiosError } from "axios";
import { getData } from "country-list";
import {
  User,
  Building,
  Mail,
  Phone,
  Lock,
  Globe,
  Loader2,
  Package,
} from "lucide-react";
import { useAuth } from "../hooks/use-auth";
import { authApi, handleApiError } from "../services/api";
import Layout from "./layout";

// Get all countries from country-list package
const countries = getData();

// Zod schema for form validation
const signUpSchema = z.object({
  email: z.email("Please enter a valid email address"),
  first_name: z
    .string()
    .min(1, "First name is required")
    .max(15, "First name must be 15 characters or less")
    .trim(),
  last_name: z.string().min(1, "Last name is required").trim(),
  phone_number: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/,
      "Please enter a valid phone number"
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  company_name: z.string().min(1, "Company name is required").trim(),
  primary_ships_country: z.string().min(1, "Please select a country"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpStep1: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      password: "",
      company_name: "",
      primary_ships_country: "US",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      // Clear any previous general errors
      clearErrors("root");

      const response = await authApi.registerStepOne(data);
      login(response);
      navigate("/sign-up-2");
    } catch (error) {
      if (error instanceof AxiosError) {
        const apiError = handleApiError(error);
        if (apiError.errors) {
          // Set field-specific errors
          Object.entries(apiError.errors).forEach(([field, message]) => {
            setError(field as keyof SignUpFormData, {
              type: "server",
              message: message as unknown as string,
            });
          });
        } else {
          // Set general error
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
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="lg:flex">
              {/* Left side - Form */}
              <div className="lg:w-1/2 p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Help keep each other safe
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {errors.root && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                      {errors.root.message}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          {...register("first_name")}
                          className={`block w-full pl-10 pr-3 py-2 border ${
                            errors.first_name
                              ? "border-red-300"
                              : "border-gray-300"
                          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                          placeholder="First name"
                        />
                      </div>
                      {errors.first_name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.first_name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          {...register("last_name")}
                          className={`block w-full pl-10 pr-3 py-2 border ${
                            errors.last_name
                              ? "border-red-300"
                              : "border-gray-300"
                          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                          placeholder="Last name"
                        />
                      </div>
                      {errors.last_name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.last_name.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        {...register("company_name")}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.company_name
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="Company name"
                      />
                    </div>
                    {errors.company_name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.company_name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Work email address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        {...register("email")}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.email ? "border-red-300" : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="name@company.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        {...register("phone_number")}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.phone_number
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    {errors.phone_number && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone_number.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        {...register("password")}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.password ? "border-red-300" : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="Password"
                      />
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primarily ships within
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        {...register("primary_ships_country")}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.primary_ships_country
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      >
                        {countries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.primary_ships_country && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.primary_ships_country.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs text-gray-500">
                      By clicking Sign up, you confirm that you have read and
                      agreed to{" "}
                      <a href="#" className="text-blue-600 hover:text-blue-500">
                        ShipOrbit's General Terms and Conditions and Privacy
                        Policy
                      </a>
                      .
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Sign up"
                    )}
                  </button>
                </form>
              </div>

              {/* Right side - Features */}
              <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white">
                <div className="h-full flex flex-col">
                  <div className="text-center mb-8">
                    <Package className="h-12 w-12 text-white mx-auto mb-4" />
                    <h1 className="text-3xl font-extrabold text-white">
                      Join ShipOrbit
                    </h1>
                    <p className="mt-2 text-white">
                      Start your journey with modern logistics
                    </p>
                  </div>
                  <div className="mb-8">
                    <img
                      src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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

                    <p className="text-blue-100 text-sm">
                      Book, track and manage loads online 24/7. And we're always
                      here if there are any bumps along the way.
                    </p>
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

export default SignUpStep1;
