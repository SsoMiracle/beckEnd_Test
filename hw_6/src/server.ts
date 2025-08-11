import express, { Request, Response } from "express";
import dotenv from "dotenv";
import newsRoutes from "./routes/news";
import path from "path";
import { registerSchema } from "../db/fileDB";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const __dirnameBase = path.resolve();

app.use(cors({ origin: true, credentials: true }));

// app.use(
//   cors({
//     origin: ["http://localhost:3000", "http://localhost:3001"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

registerSchema("news", {
  id: Number,
  title: String,
  text: String,
  createDate: Date,
});

app.use(express.json());

app.use("/api/newsposts", newsRoutes);

app.use(express.static(path.join(__dirnameBase, "react-app-client", "build")));

app.get(/^\/(?!api).*/, (_req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirnameBase, "react-app-client", "build", "index.html")
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// app.get("/", (_req: Request, res: Response) => {
//   res.json({ status: "ok", message: "Server is working" });
// });

// app.get("*", (_req, res) => {
//   res.sendFile(path.join(__dirname, "../react-app-client/build/index.html"));
// });

// app.get("*", (_req: Request, res: Response) => {
//   res.sendFile(
//     path.join(__dirnameBase, "react-app-client", "build", "index.html")
//   );
// });
