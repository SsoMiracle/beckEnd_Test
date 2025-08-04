import express, { Request, Response } from "express";
import dotenv from "dotenv";
import newsRoutes from "./routes/news.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/api/newsposts", newsRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.json({ status: "ok", message: "Server is working" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
