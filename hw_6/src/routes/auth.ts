import { Router } from "express";
import { AuthController } from "../auth/controllers/AuthController";
import { register, login, getUser, authMiddleware } from "../../src/auth/controllers/auth.controller"

const router = Router();

router.post("/register", AuthController.register);
router.get("/user", authMiddleware, getUser);
router.post("/login", AuthController.login);

export default router;
