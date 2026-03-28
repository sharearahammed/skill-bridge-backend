import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import authMiddleware from "../../lib/middlewares/auth.js";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/me", authMiddleware(), AuthController.getMe);

export const authRouter: Router = router;
