import { Response } from "express";
import Psychologist from "../../models/Psychologist.js";
import { ICustomerRequest } from "../../interfaces/authInterfaces.js";
import generateSort from "../../helpers/generateSort.js";

const psychologistsLoggedIn = async (req: ICustomerRequest, res: Response) => {
  const { email } = req.user;
  const { name, price, popular } = req.query;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 3;
  const skip = (page - 1) * limit;

  const sort = generateSort(name as string, price as string, popular as string);

  const psychologistsPagination = await Psychologist.find(
    {
      $or: [{ owner: { $size: 0 } }, { owner: { $in: [email] } }],
    },
    "-updatedAt"
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

export default psychologistsLoggedIn;
