import { Request, Response } from "express";
import { ReviewService } from "./review.service.js";

// Student add review
const createReview = async (req: Request, res: Response) => {
  const studentId = req.user!.id;

  const { tutorId, categoryId, rating, comment } = req.body;

  try {
    const review = await ReviewService.createReview(
      studentId,
      tutorId,
      categoryId,
      rating,
      comment,
    );

    res.json({
      success: true,
      data: review,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
};

// update review
const updateReview = async (req: Request, res: Response) => {
  const studentId = req.user!.id;

  const reviewIdParam = req.params.reviewId;

  if (!reviewIdParam || Array.isArray(reviewIdParam)) {
    return res.status(400).json({
      success: false,
      message: "Invalid review id",
    });
  }

  const reviewId = reviewIdParam;
  const { rating, comment } = req.body;

  try {
    const review = await ReviewService.updateReview(
      studentId,
      reviewId,
      rating,
      comment,
    );

    res.json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
};

// Get all reviews of a tutor
const getTutorReviewsByCategory = async (req: Request, res: Response) => {
  try {
    let { tutorId, categoryId } = req.params;

    if (!tutorId || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "tutorId and categoryId are required",
      });
    }

    if (Array.isArray(tutorId)) tutorId = tutorId[0];
    if (Array.isArray(categoryId)) categoryId = categoryId[0];

    const page = parseInt(req.query.page as string) || 1;

    const result = await ReviewService.getTutorReviewsByCategory(
      tutorId as string,
      categoryId as string,
      page,
    );

    res.json({ success: true, data: result });
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof Error) {
      res.status(500).json({ success: false, message: err.message });
    } else {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
};

// Get a review by student and category
const getStudentReview = async (req: Request, res: Response) => {
  try {
    const { studentId, categoryId } = req.query;

    if (!studentId || !categoryId)
      return res
        .status(400)
        .json({ message: "studentId and categoryId are required" });

    const review = await ReviewService.getStudentReview(
      studentId as string,
      categoryId as string,
    );

    return res.status(200).json({ data: review });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Something went wrong" });
  }
};

// Get single review by reviewId
const getReviewById = async (req: Request, res: Response) => {
  try {
    const reviewId = req.params.id;
    console.log({ reviewId });
    if (!reviewId || typeof reviewId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid review id",
      });
    }

    const review = await ReviewService.getReviewById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review retrieved successfully",
      data: review,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve review",
    });
  }
};

const getTutorReviews = async (req: Request, res: Response) => {
  const tutorId = req.params.tutorId as string;
  const reviews = await ReviewService.getTutorReviews(tutorId);
  res.json({ success: true, data: reviews });
};


export const ReviewController = {
  createReview,
  updateReview,
  getTutorReviewsByCategory,
  getStudentReview,
  getReviewById,
  getTutorReviews,
};
