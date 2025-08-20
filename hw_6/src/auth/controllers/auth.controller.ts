import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../services/AuthService";
import jwt from "jsonwebtoken";
import { ValidationError } from "../../utils/errors";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

// Middleware для проверки авторизации
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

  const token = authHeader.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // @ts-ignore
    req.user = decoded; // добавляем данные пользователя в req
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Контроллер регистрации
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const result = await AuthService.register({
      email,
      password,
      confirmPassword,
    });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

// Контроллер логина
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login({ email, password });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// Контроллер для получения данных авторизованного пользователя
export const getUser = (req: Request, res: Response) => {
  const user = req.user as { id: number; email: string };
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  res.json({ id: user.id, email: user.email });
};
