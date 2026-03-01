import { Request, Response } from "express";
import { TutorSubjectService } from "./tutorSubject.service";

const addSubjects = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const result = await TutorSubjectService.addSubjects(
    userId,
    req.body.categoryIds
  );

  res.json({ success: true, data: result });
};

export const TutorSubjectController = { addSubjects };