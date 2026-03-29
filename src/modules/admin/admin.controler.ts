// admin.controller.ts
import { Request, Response } from "express";
import { AdminService } from "./admin.service.js";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const result = await AdminService.getAllUsers(page);
    res.json({ success: true, data: result });
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
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(
      1,
      Math.min(100, parseInt(req.query.limit as string) || 10),
    );
    const { data, total } = await AdminService.getAllBookings(page, limit);
    res.json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
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

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id || Array.isArray(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category id" });
    }
    await AdminService.deleteCategory(id);
    res.json({ success: true, message: "Category deleted" });
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
  deleteCategory,
};
