import { Router } from "express";
import patientsData from "../data/patients";
import { PatientInfo } from "../types/Patient";

const patientsRouter = Router();

patientsRouter.get("/", (_req, res) => {
  const patientList: PatientInfo[] = patientsData.map(({ ssn, ...patient }) => {
    return patient;
  });

  res.status(200).json(patientList);
});

export default patientsRouter;
