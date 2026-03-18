import { Request, Response } from "express";
import { AvailabilityService } from "./availability.service.js";

const createSlot = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const result = await AvailabilityService.createSlot(
    userId,
    req.body
  );

  res.json({ success: true, data: result });
};

const getSlots = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const result = await AvailabilityService.getSlots(userId);

  res.json({ success: true, data: result });
};

export const AvailabilityController = {
  createSlot,
  getSlots,
};