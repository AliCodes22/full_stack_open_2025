import express from "express";
import diagnosisRouter from "./routes/diagnosisRouter";
import patientsRouter from "./routes/patientsRouter";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/diagnoses", diagnosisRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
  console.log("listening");
});
