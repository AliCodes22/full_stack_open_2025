import { z } from "zod";

export const EntrySchema = z.object({});

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
  entries: z.array(EntrySchema),
});

export type Patient = z.infer<typeof PatientSchema>;
export type Entry = z.infer<typeof EntrySchema>;
export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type PatientInfo = Omit<Patient, "ssn">;
