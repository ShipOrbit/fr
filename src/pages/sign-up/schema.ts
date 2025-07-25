import { z } from "zod";

export const signUpSchema = z.object({
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

export const shippingNeedsSchema = z.object({
  company_location: z.string().min(1, "Please select a company location"),
  mode: z.array(z.string()).min(1, "Please select at least one mode type"),
  average_ftl: z.string().min(1, "Please select average FTL shipment volume"),
  trailer_type: z
    .array(z.string())
    .min(1, "Please select at least one trailer type"),
  user_id: z.number().optional(),
});
