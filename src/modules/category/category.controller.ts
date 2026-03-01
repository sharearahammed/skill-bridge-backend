import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const createCategory = async (req: Request, res: Response) => {
  const result = await CategoryService.createCategory(req.body.name);
  res.json({ success: true, data: result });
};

const getCategories = async (req: Request, res: Response) => {
  const result = await CategoryService.getCategories();
  res.json({ success: true, data: result });
};

export const CategoryController = {
  createCategory,
  getCategories,
};
