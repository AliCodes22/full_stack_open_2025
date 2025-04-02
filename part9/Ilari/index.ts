import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

const PORT = 3000;

app.get("/ping", (_req: Request, res: Response) => {
  res.send("Pong");
});

app.listen(PORT, () => {
  console.log("listening");
});
