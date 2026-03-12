// tutors.controller.ts
import { Request, Response } from "express";
import { TutorsService } from "./tutors.service";

export interface TutorFilters {
  categoryId?: string;
  minRating?: number;
  maxRate?: number;
  search?: string;
}

// Get all tutors with optional filters
const getAllTutors = async (req: Request, res: Response) => {
  try {
    const filters: TutorFilters = {};

    const { categoryId, minRating, maxRate, search } = req.query;

    if (categoryId && typeof categoryId === "string") {
      filters.categoryId = categoryId;
    }

    if (minRating && typeof minRating === "string") {
      const rating = Number(minRating);
      if (!isNaN(rating)) filters.minRating = rating;
    }

    if (maxRate && typeof maxRate === "string") {
      const rate = Number(maxRate);
      if (!isNaN(rate)) filters.maxRate = rate;
    }

    if (search && typeof search === "string") {
      filters.search = search;
    }

    const tutors = await TutorsService.getAllTutors(filters);

    res.json({
      success: true,
      count: tutors.length,
      data: tutors,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
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
