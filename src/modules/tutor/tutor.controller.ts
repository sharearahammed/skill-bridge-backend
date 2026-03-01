import { Request, Response } from "express";
import { TutorService } from "./tutor.service";

const createOrUpdateProfile = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const result = await TutorService.createOrUpdateProfile(userId, req.body);

  res.json({ success: true, data: result });
};

export const TutorController = { createOrUpdateProfile };
