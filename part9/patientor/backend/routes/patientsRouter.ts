import { Request, Response, Router } from "express";
import patientsData from "../data/patients";
import { PatientInfo, Patient, PatientSchema } from "../types/Patient";
import { v1 as uuid } from "uuid";
import { z } from "zod";
import { Entry } from "../types/Diagnosis";

const patientsRouter = Router();

patientsRouter.get("/", (_req, res) => {
  const patientList: PatientInfo[] = patientsData.map(({ ssn, ...patient }) => {
    return patient;
  });

  res.status(200).json(patientList);
});

patientsRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const patient = patientsData.find((patient: Patient) => patient.id === id);

  if (!patient) {
    res.status(404).json({
      message: "Patient not found",
    });
  }

  res.status(200).json(patient);
});

patientsRouter.post("/", (req, res) => {
  const id = uuid();

  try {
    const newPatient: Patient = PatientSchema.parse({
      ...req.body,
      id,
    });

    patientsData.push(newPatient);

    res.status(200).json(newPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({
        error: error.issues,
      });
    } else {
      res.status(400).send({
        error: "unknown error",
      });
    }
  }
});

patientsRouter.post("/:id/entries", (req, res) => {
  const { id } = req.params;

  const patient = patientsData.find((item) => item.id === id);
  const entry: Entry = req.body;

  if (
    entry.type !== "HealthCheck" &&
    entry.type !== "OccupationalHealthcare" &&
    entry.type !== "Hospital"
  ) {
    res.status(400).json({
      message: "Wrong entry type",
    });
    return;
  }

  if (entry.type === "HealthCheck") {
    const rating = Number(entry.healthCheckRating);

    if (rating < 0 || rating > 3) {
      res.status(400).json({
        message: `Value of healthCheckRating incorrect ${entry.healthCheckRating}`,
      });
      return;
    }
  }

  if (!patient) {
    res.status(400).json({
      message: "Patient not found",
    });
    return;
  }

  patient?.entries?.push(entry);

  res.status(200).json(entry);
});

patientsRouter.delete("/:id/entries/:entryId", (req, res) => {
  const { id } = req.params;
  const { entryId } = req.params;

  const patient = patientsData.find((patient) => patient.id === id);

  if (!patient) {
    res.status(404).json({
      message: "patient not found or entry not found",
    });
    return;
  }

  const updatedEntries = patient?.entries?.filter(
    (entry) => entry.id !== entryId
  );

  patient.entries = updatedEntries;

  res.status(200).json(updatedEntries);
});

export default patientsRouter;
