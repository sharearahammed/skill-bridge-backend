import { Request, Response } from "express";
import { CategoriesService, CategoryInput } from "./admin.service";
import { AvailabilityInput } from "../Tutors/tutors.interface";

const createCategory = async (req: Request, res: Response) => {
  try {
    const inputs: CategoryInput[] = req.body;
    const category = await CategoriesService.createCategory(inputs);
    res.status(201).json({ success: true, data: category });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await CategoriesService.getAllCategories();
    res.status(200).json({ success: true, data: categories });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};


export const CategoriesController = {
  createCategory,
  getAllCategories,
};
