import { Request, Response } from "express";
import { StudentService } from "./student.service";

const updateStudent = async (req: Request, res: Response) => {
  try {
    let userId = req.params.userId;

    if (Array.isArray(userId)) userId = userId[0];

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId is required" });
    }

    const { name, email, image } = req.body;

    if (!name && !email && !image) {
      return res
        .status(400)
        .json({ success: false, message: "Nothing to update" });
    }

    const updated = await StudentService.updateStudent({
      userId,
      name,
      email,
      image,
    });

    res.json({ success: true, data: updated });
  } catch (error: any) {
    console.error(error);
    res
      .status(400)
      .json({ success: false, message: error.message || "Internal error" });
  }
};

export const StudentController = {
  updateStudent,
};
