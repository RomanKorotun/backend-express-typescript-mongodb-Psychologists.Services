import { Response } from "express";
import Psychologist from "../../models/Psychologist.js";
import { ICustomerRequest } from "../../interfaces/authInterfaces.js";
import { HttpError } from "../../helpers/index.js";

const toggleFavoriteCardForLoggedInUser = async (
  req: ICustomerRequest,
  res: Response
) => {
  const { email } = req.user;
  const { id } = req.params;
  const card = await Psychologist.findById(id);
  const idx = card?.owner.indexOf(email);
  if (idx !== -1 && idx !== undefined) {
    card?.owner.splice(idx, 1);
  } else {
    card?.owner.push(email);
  }

  const updateCard = await Psychologist.findByIdAndUpdate(id, {
    owner: card?.owner,
  }).select("-updatedAt");

  if (!updateCard) {
    throw HttpError(404);
  }

  const responseCard = {
    ...updateCard.toObject(),
    owner: idx !== -1 ? [] : [email],
  };

  res.json(responseCard);
};

export default toggleFavoriteCardForLoggedInUser;
