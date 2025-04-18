export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export interface Entry {
  description: string;
  creationDate: Date;
  specialist: string;
  diagnosisCodes?: string[];
  healthCheckRating: string;
  date: string;
  employerName?: string;
  type: string;
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
