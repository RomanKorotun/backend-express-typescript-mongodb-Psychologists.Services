import { Request, Response } from "express";
import Psychologist from "../../models/Psychologist.js";
import generateSort from "../../helpers/generateSort.js";

const psychologistsNotLoggedIn = async (req: Request, res: Response) => {
  const { name, price, popular } = req.query;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 3;
  const skip = (page - 1) * limit;

  const sort = generateSort(name as string, price as string, popular as string);

  const psychologistsPagination = await Psychologist.find(
    {},
    "-owner -updatedAt"
  )
    .sort(sort)
    .skip(skip)
    .limit(limit);
  const allPsychologists = await Psychologist.find({});
  const pagesQuintity = Math.ceil(allPsychologists.length / limit);
  res.json({
    items: psychologistsPagination,
    pagesQuintity,
  });
};
export default psychologistsNotLoggedIn;
