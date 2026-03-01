// tutors.controller.ts
import { Request, Response } from "express";
import { TutorsService } from "./tutors.service";

interface TutorFilters {
  categoryId?: string;
  minRating?: number;
  maxRate?: number;
}

// Get all tutors with optional filters
const getAllTutors = async (req: Request, res: Response) => {
  try {
    const filters: TutorFilters = {};

    // Only add filters if query params exist
    if (req.query.categoryId && typeof req.query.categoryId === "string") {
      filters.categoryId = req.query.categoryId;
    }

    if (req.query.minRating) {
      const min = Number(req.query.minRating);
      if (!isNaN(min)) filters.minRating = min;
    }

    if (req.query.maxRate) {
      const max = Number(req.query.maxRate);
      if (!isNaN(max)) filters.maxRate = max;
    }

    const tutors = await TutorsService.getAllTutors(filters);

    res.json({ success: true, data: tutors });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get tutor profile by id
const getTutorProfile = async (req: Request, res: Response) => {
  try {
    const tutorId = String(req.params.id);
    const tutor = await TutorsService.getTutorProfile(tutorId);
    res.json({ success: true, data: tutor });
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const getFeaturedTutors = async (req: Request, res: Response) => {
  const tutors = await TutorsService.getFeaturedTutors();
  res.json({ success: true, data: tutors });
};

export const TutorsController = {
  getAllTutors,
  getTutorProfile,
  getFeaturedTutors,
};
