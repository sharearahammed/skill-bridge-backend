import { Request, Response } from "express";
import { ReviewService } from "./review.service";

// Student add review
const createReview = async (req: Request, res: Response) => {
  const studentId = req.user!.id;
  const { tutorId, rating, comment } = req.body;
  try {
    const review = await ReviewService.createReview(
      studentId,
      tutorId,
      rating,
      comment
    );
    res.json({ success: true, data: review });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get all reviews of a tutor
const getTutorReviews = async (req: Request, res: Response) => {
  const tutorId = req.params.tutorId as string;
  const reviews = await ReviewService.getTutorReviews(tutorId);
  res.json({ success: true, data: reviews });
};

export const ReviewController = { createReview, getTutorReviews };