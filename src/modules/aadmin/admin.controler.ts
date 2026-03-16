// admin.controller.ts
import { Request, Response } from "express";
import { AdminService } from "./admin.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await AdminService.getAllUsers();
    res.json({ success: true, data: users });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;

    // Validate id
    if (!idParam || Array.isArray(idParam)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user id" });
    }

    const { status } = req.body;

    const user = await AdminService.updateUserStatus(idParam, status);
    res.json({ success: true, data: user });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await AdminService.getAllBookings();
    res.json({ success: true, data: bookings });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await AdminService.getAllCategories();
    res.json({ success: true, data: categories });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const createCategory = async (req: Request, res: Response) => {
  try {
    const input = req.body; // { name: string }
    const category = await AdminService.createCategory(input);
    res.json({ success: true, data: category });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const AdminController = {
  getAllUsers,
  getAllCategories,
  createCategory,
  getAllBookings,
  updateUserStatus,
};
