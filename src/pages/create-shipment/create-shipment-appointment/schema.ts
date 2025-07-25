import z from "zod";

export const facilitySchema = z.object({
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

export type FacilityFormData = z.infer<typeof facilitySchema>;
