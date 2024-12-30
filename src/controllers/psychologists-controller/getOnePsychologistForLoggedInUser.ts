import { Request, Response } from "express";
import Psychologist from "../../models/Psychologist.js";
import { HttpError } from "../../helpers/index.js";
import { ICustomerRequest } from "../../interfaces/authInterfaces.js";

const getOnePsychologistForLoggedInUser = async (
  req: ICustomerRequest,
  res: Response
) => {
  const { id } = req.params;
  const { email } = req.user;
  const psychologist = await Psychologist.findById(id, "-updatedAt");
  if (!psychologist) {
    throw HttpError(404);
  }
  const updatedPsychologist = {
    ...psychologist.toObject(),
    owner: psychologist.owner.includes(email) ? psychologist.owner : [],
  };
  res.json(updatedPsychologist);
};

export default getOnePsychologistForLoggedInUser;
