import express, { Request, Response } from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello full stack",
  });
});

app.get("/bmi", (req: Request, res: Response) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi = calculateBmi(height, weight);

  res.status(200).json({
    height,
    weight,
    bmi,
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("app on!");
});
