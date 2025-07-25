import z from "zod";

export const shipmentSchema = z.object({
  equipment: z.string().nonempty(),
  pickup_location: z.number("You must select an option"),
  dropoff_location: z.number("You must select an option"),
  pickup_date: z.string().min(10, "Pick-up date is required"),
  dropoff_date: z.string().min(10),
});

export type ShipmentFormValues = z.infer<typeof shipmentSchema>;
