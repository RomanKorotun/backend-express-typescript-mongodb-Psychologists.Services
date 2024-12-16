import { Response } from "express";
import Psychologist from "../../models/Psychologist.js";
import { ICustomerRequest } from "../../interfaces/authInterfaces.js";
import generateSort from "../../helpers/generateSort.js";

const psychologistsFavorite = async (req: ICustomerRequest, res: Response) => {
  const { email } = req.user;
  const { name, price, popular } = req.query;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 3;
  const skip = (page - 1) * limit;

  const sort = generateSort(name as string, price as string, popular as string);

  const psychologistsFavoritePagination = await Psychologist.find(
    { owner: { $in: [email] } },
    "-updatedAt"
  )
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const allPsychologistsFavorite = await Psychologist.find({
    owner: { $in: [email] },
  });

  const pagesQuintity = Math.ceil(allPsychologistsFavorite.length / limit);

  res.json({
    items: psychologistsFavoritePagination,
    pagesQuintity,
  });
};

export default psychologistsFavorite;
