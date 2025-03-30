import { Router } from "express";
import patientsData from "../data/patients";
import { PatientInfo, Patient } from "../types/Patient";
import { v1 as uuid } from "uuid";

const patientsRouter = Router();

patientsRouter.get("/", (_req, res) => {
  const patientList: PatientInfo[] = patientsData.map(({ ssn, ...patient }) => {
    return patient;
  });

  res.status(200).json(patientList);
});

patientsRouter.post("/", (req, res) => {
  const id = uuid();

  const newPatient = {
    ...req.body,
    id,
  };
});

export default patientsRouter;
