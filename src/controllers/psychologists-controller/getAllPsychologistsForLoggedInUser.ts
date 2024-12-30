import { Response } from "express";
import Psychologist from "../../models/Psychologist.js";
import { ICustomerRequest } from "../../interfaces/authInterfaces.js";
import generateSort from "../../helpers/generateSort.js";

const getAllPsychologistsForLoggedInUser = async (
  req: ICustomerRequest,
  res: Response
) => {
  const { email } = req.user;
  const { name, price, popular } = req.query;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 3;
  const skip = (page - 1) * limit;

  const sort = generateSort(name as string, price as string, popular as string);

  const psychologistsPagination = await Psychologist.find(
    {},
    "-updatedAt -reviews"
  )
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const updatedPsychologists = psychologistsPagination.map((psychologist) => {
    return {
      ...psychologist.toObject(),
      owner: psychologist.owner.includes(email) ? [email] : [],
    };
  });

  const countPsychologists = await Psychologist.countDocuments();

  const pagesQuintity = Math.ceil(countPsychologists / limit);

  res.json({
    items: updatedPsychologists,
    pagesQuintity,
  });
};

export default getAllPsychologistsForLoggedInUser;
