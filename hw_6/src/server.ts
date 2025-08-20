import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

import newsRoutes from "./routes/news";
import { registerSchema } from "../db/fileDB";
import { logger } from "./utils/logger";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const __dirnameBase = path.resolve();

// --- Регистрируем схему для "news"
registerSchema("news", {
  id: Number,
  title: String,
  text: String,
  genre: String,
  isPrivate: Boolean,
  createDate: Date,
});

// --- Middleware
app.use(express.json());

app.use(
  cors({
    origin: true, // разрешаем dev-origin (3000/3001/3002 и т.д.)
    credentials: true,
  })
);

// Логируем каждый входящий запрос (INFO)
app.use((req: Request, _res: Response, next: NextFunction) => {
  const hasBody = req.body && Object.keys(req.body).length > 0;
  logger.info(
    `Incoming request: ${req.method} ${req.originalUrl}` +
      (hasBody ? ` Body: ${JSON.stringify(req.body)}` : "")
  );
  next();
});

// --- API роуты
app.use("/api/newsposts", newsRoutes);
app.use("/api/auth", authRoutes);

// --- Раздача React-клиента
app.use(express.static(path.join(__dirnameBase, "react-app-client", "build")));
app.get(/^\/(?!api).*/, (_req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirnameBase, "react-app-client", "build", "index.html")
  );
});

// --- Глобальный обработчик ошибок
app.use(errorHandler);

// --- Запуск сервера
app.listen(PORT, () => {
  logger.info(`🚀 Server is running on http://localhost:${PORT}`);
});
