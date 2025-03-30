import { z } from "zod";

export const PatientSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, "Name should only contain letters and spaces.")
    .min(1, "Name cannot be empty."),
  dateOfBirth: z.string().date(),
  gender: z.enum(["male", "female"]),
  occupation: z.string(),
  ssn: z.string(),
});

export type Patient = z.infer<typeof PatientSchema>;

export type PatientInfo = Omit<Patient, "ssn">;
