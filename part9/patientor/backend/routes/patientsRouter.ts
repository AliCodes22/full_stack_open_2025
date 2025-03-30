import { Router } from "express";
import patientsData from "../data/patients";
import { PatientInfo, Patient, PatientSchema } from "../types/Patient";
import { v1 as uuid } from "uuid";
import { z } from "zod";

const patientsRouter = Router();

patientsRouter.get("/", (_req, res) => {
  const patientList: PatientInfo[] = patientsData.map(({ ssn, ...patient }) => {
    return patient;
  });

  res.status(200).json(patientList);
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

export default patientsRouter;
