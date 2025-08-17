import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { ValidationError, NewspostsServiceError } from "../utils/errors";

interface CustomError extends Error {
  statusCode?: number;
  details?: unknown;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let status = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let details: unknown = err.details;

  // Определяем тип ошибки
  if (err instanceof ValidationError) {
    status = 400;
    message = err.message;
    details = err.details;
  } else if (err instanceof NewspostsServiceError) {
    status = 422; // Unprocessable Entity
    message = err.message;
  }

  // Логируем ошибку
  logger.error(`[${req.method}] ${req.url} → ${status} : ${message}`, {
    stack: err.stack,
    details,
  });

  // Отдаем JSON-ответ
  res.status(status).json({
    success: false,
    error: message,
    ...(details ? { details } : {}),
  });
};
