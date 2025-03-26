import { Router, Request, Response } from "express";
import diagnosisData from "../data/diagnoses";
import { Diagnosis } from "../types/Diagnosis";

const router = Router();

router.get("/", (_req: Request, res: Response<Diagnosis[]>) => {
  res.json(diagnosisData);
});

export default router;
