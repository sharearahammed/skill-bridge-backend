import { Request, Response } from "express";
import { TutorSubjectService } from "./tutorSubject.service";

const addSubjects = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const result = await TutorSubjectService.addSubjects(
    userId,
    req.body.categoryIds,
  );

  res.json({ success: true, data: result });
};

const getSubjects = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId required" });
    }

    const parsedUserId = Array.isArray(userId) ? userId[0]! : userId;

    const subjects = await TutorSubjectService.getTutorSubjects(parsedUserId);

    res.json({ success: true, data: subjects });
  } catch (err: unknown) {
    console.error(err);

    if (err instanceof Error) {
      res.status(500).json({ success: false, message: err.message });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};

export const TutorSubjectController = { addSubjects, getSubjects };
