import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UsersRepository } from "../repositories/UsersRepository";
import { ValidationError } from "../utils/errors";
import { User } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

const isEmail = (email: string) => /^\S+@\S+\.\S+$/i.test(email);

export class AuthService {
  static async register(payload: {
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    const { email, password, confirmPassword } = payload;

    if (!email || !password || !confirmPassword) {
      throw new ValidationError("Email и пароли обязательны");
    }
    if (!isEmail(email)) {
      throw new ValidationError("Неверный формат email");
    }
    if (password !== confirmPassword) {
      throw new ValidationError("Пароли не совпадают");
    }

    const existingUser = await UsersRepository.findByEmail(email);
    if (existingUser) {
      throw new ValidationError("Пользователь с таким email уже существует");
    }

    const hash = await bcrypt.hash(password, 10);
    const userData: Omit<User, "id" | "createDate"> = { email, password: hash };
    const user = await UsersRepository.create(userData);

    const token = this.signToken(user.id, user.email);
    return { token, user: { id: user.id, email: user.email } };
  }

  static async login(payload: { email: string; password: string }) {
    const { email, password } = payload;

    if (!email || !password) {
      throw new ValidationError("Email и пароль обязательны");
    }

    const user = await UsersRepository.findByEmail(email);
    if (!user) {
      throw new ValidationError("Неверные учетные данные");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new ValidationError("Неверные учетные данные");
    }

    const token = this.signToken(user.id, user.email);
    return { token, user: { id: user.id, email: user.email } };
  }

  private static signToken(id: number, email: string) {
    return jwt.sign({ id, email }, JWT_SECRET, { expiresIn: "1d" });
  }
}
