import { Request, Response } from "express";
import Psychologist from "../../models/Psychologist.js";
import { HttpError } from "../../helpers/index.js";

const getOnePsychologistForNotLoggedInUser = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const psychologist = await Psychologist.findById(id, "-owner -updatedAt");
  if (!psychologist) {
    throw HttpError(404);
  }
  res.json(psychologist);
};

export default getOnePsychologistForNotLoggedInUser;
