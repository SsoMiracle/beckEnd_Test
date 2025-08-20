import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../services/AuthService";
import { ValidationError } from "../../utils/errors";

interface RegisterBody {
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export class AuthController {
  static async register(
    req: Request<{}, {}, RegisterBody>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, password, confirmPassword } = req.body;
      if (!email || !password || !confirmPassword) {
        throw new ValidationError("All fields are required", [
          { field: "email/password/confirmPassword", message: "Missing field" },
        ]);
      }
      if (password !== confirmPassword) {
        throw new ValidationError("Passwords do not match", [
          { field: "confirmPassword", message: "Must match password" },
        ]);
      }

      const user = await AuthService.register({ email, password, confirmPassword });
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }

  static async login(
    req: Request<{}, {}, LoginBody>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new ValidationError("Email and password are required", [
          { field: "email/password", message: "Missing" },
        ]);
      }

      const token = await AuthService.login({ email, password });
      res.json({ token });
    } catch (e) {
      next(e);
    }
  }
}
