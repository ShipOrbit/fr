import * as z from "zod";

export const shipmentSchema = z.object({
  reference_number: z.string().optional(),
  weight: z.union([z.number().int().positive().min(1), z.nan()]).optional(),
  commodity: z.string().optional(),
  packaging: z.union([z.number().int().positive().min(1), z.nan()]).optional(),
  packaging_type: z.string().optional(),
  pickup_number: z.string().min(1, "This field may not be blank."),
  pickup_notes: z.string().min(1, "This field may not be blank."),
  dropoff_number: z.string().min(1, "This field may not be blank."),
  dropoff_notes: z.string().min(1, "This field may not be blank."),
});

export type ShipmentFormValues = z.infer<typeof shipmentSchema>;
