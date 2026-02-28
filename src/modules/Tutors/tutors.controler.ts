import { Request, Response } from "express";
import { TutorsService } from "./tutors.service";
import { AvailabilityInput, TutorFilters } from "./tutors.interface";

const createOrUpdateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id; // authMiddleware required
    const profile = await TutorsService.createOrUpdateProfile(userId, req.body);
    res.status(200).json({ success: true, data: profile });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getAllTutors = async (req: Request, res: Response) => {
  try {
    const filters = {
      categoryId: req.query.categoryId as string | undefined,
      minRating: req.query.minRating ? Number(req.query.minRating) : undefined,
      maxRate: req.query.maxRate ? Number(req.query.maxRate) : undefined,
    } as TutorFilters;

    const tutors = await TutorsService.getAllTutors(filters);
    res.json({ success: true, data: tutors });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET /api/tutors/:id
const getTutorProfile = async (req: Request, res: Response) => {
  try {
    const tutorId = req.params.id;
    if (!tutorId || Array.isArray(tutorId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid tutor ID" });
    }
    const tutor = await TutorsService.getTutorProfile(tutorId);
    res.json({ success: true, data: tutor });
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const createSlot = async (req: Request, res: Response) => {
  try {
    const tutorId = req.user!.id;
    const input: AvailabilityInput = req.body;
    const slot = await TutorsService.createSlot(tutorId, input);
    res.status(201).json({ success: true, data: slot });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};
const getSlots = async (req: Request, res: Response) => {
  try {
    const tutorId = req.user!.id;
    const slots = await TutorsService.getSlots(tutorId);
    res.status(200).json({ success: true, data: slots });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};
const deleteSlot = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await TutorsService.deleteSlot(id as string);
    res.status(200).json({ success: true });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateSlot = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const input: AvailabilityInput = req.body;
    const slot = await TutorsService.updateSlot(id as string, input);
    res.status(200).json({ success: true, data: slot });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const TutorsController = {
  getAllTutors,
  getTutorProfile,
  createOrUpdateProfile,
  createSlot,
  getSlots,
  deleteSlot,
  updateSlot,
};
