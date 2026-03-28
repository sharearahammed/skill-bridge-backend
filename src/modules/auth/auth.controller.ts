import { Request, Response } from "express";
import { AuthService } from "./auth.service.js";

const register = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.register(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.login(req.body);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(401).json({ success: false, message: err.message });
  }
};

const getMe = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.getMe(req.user!.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, data: user });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const AuthController = { register, login, getMe };
