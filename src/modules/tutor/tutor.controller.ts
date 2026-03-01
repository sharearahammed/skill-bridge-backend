import { Request, Response } from "express";
import { TutorService } from "./tutor.service";

const createOrUpdateProfile = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const result = await TutorService.createOrUpdateProfile(userId, req.body);

  res.json({ success: true, data: result });
};

const createAvailability = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const slot = await TutorService.createAvailability(userId, req.body);
  res.json({ success: true, data: slot });
};

const getTutorSessions = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const sessions = await TutorService.getTutorSessions(userId);
  res.json({ success: true, data: sessions });
};

export const TutorController = {
  createOrUpdateProfile,
  createAvailability,
  getTutorSessions,
};
