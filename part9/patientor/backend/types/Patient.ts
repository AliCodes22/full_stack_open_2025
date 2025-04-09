import { z } from "zod";

// Example schemas for each entry type
const HospitalEntrySchema = z.object({
  type: z.literal("Hospital"),
  id: z.string(),
  date: z.string(),
  specialist: z.string(),
  description: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

const OccupationalHealthcareEntrySchema = z.object({
  type: z.literal("OccupationalHealthcare"),
  id: z.string(),
  date: z.string(),
  specialist: z.string(),
  employerName: z.string(),
  description: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  sickLeave: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .optional(),
});

const HealthCheckEntrySchema = z.object({
  type: z.literal("HealthCheck"),
  id: z.string(),
  date: z.string(),
  specialist: z.string(),
  description: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  healthCheckRating: z.number().min(0).max(3),
});

// Union schema for entries
export const EntrySchema = z.union([
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
  HealthCheckEntrySchema,
]);

// Patient schema with entries as an array of Entry types
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
  entries: z.array(EntrySchema).optional(),
});

export type Patient = z.infer<typeof PatientSchema>;
export type Entry = z.infer<typeof EntrySchema>;
export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type PatientInfo = Omit<Patient, "ssn">;
