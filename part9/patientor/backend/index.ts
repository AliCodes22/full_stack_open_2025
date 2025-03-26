import express from "express";
import diagnosisRouter from "./routes/diagnosisRouter";

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/diagnoses", diagnosisRouter);

app.listen(PORT, () => {
  console.log("listening");
});
