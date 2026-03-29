import { Request, Response } from "express";
import { TutorService } from "./tutor.service.js";

const createOrUpdateProfile = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const result = await TutorService.createOrUpdateProfile(userId, req.body);

  res.json({ success: true, data: result });
};

const createAvailability = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const slot = await TutorService.createAvailability(userId, req.body);
    res.json({ success: true, data: slot });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getTutorSessions = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const page = parseInt(req.query.page as string) || 1;
    const result = await TutorService.getTutorSessions(userId, page);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getTutorReviews = async (req: Request, res: Response) => {
  try {
    let { tutorId, categoryId } = req.params;

    // Handle string[] case if any
    if (Array.isArray(tutorId)) tutorId = tutorId[0];
    if (Array.isArray(categoryId)) categoryId = categoryId[0];

    if (!tutorId || !categoryId) {
      return res
        .status(400)
        .json({
          success: false,
          message: "tutorId and categoryId are required",
        });
    }

    const reviews = await TutorService.getTutorReviewsByCategory(
      tutorId,
      categoryId,
    );

    res.json({ success: true, data: reviews });
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof Error) {
      res.status(500).json({ success: false, message: err.message });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
};

export const TutorController = {
  createOrUpdateProfile,
  createAvailability,
  getTutorSessions,
  getTutorReviews,
};
