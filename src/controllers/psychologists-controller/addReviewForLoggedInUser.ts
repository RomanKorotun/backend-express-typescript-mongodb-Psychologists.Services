import { Response } from "express";
import { ICustomerRequest } from "../../interfaces/authInterfaces";
import Psychologist from "../../models/Psychologist.js";
import { wsServer } from "../../app.js";

const addReviewForLoggedInUser = async (
  req: ICustomerRequest,
  res: Response
) => {
  const { id } = req.params;
  const { rating: currentRating, comment } = req.body;
  const { username, avatar, _id } = req.user;
  const currentUser = 1;
  const psychologist = await Psychologist.findById(id);
  const totalRating = psychologist?.reviews.reduce(
    (acc, item) => acc + (Number(item.rating) || 0),
    0
  );
  const totalUsers = psychologist?.reviews?.length || 0;
  const newRating = Number(
    ((currentRating + totalRating) / (currentUser + totalUsers)).toFixed(2)
  );

  const date = new Date();

  const newPsychologist = await Psychologist.findByIdAndUpdate(id, {
    $push: {
      reviews: {
        clientId: _id,
        reviewer: username,
        avatar,
        rating: currentRating,
        comment,
        date,
      },
    },
    $set: { rating: newRating },
  }).select("-updatedAt");

  const responseReview = {
    _id: newPsychologist?._id,
    rating: newPsychologist?.rating,
    reviews: [
      {
        clientId: _id,
        reviewer: username,
        avatar,
        rating: currentRating,
        comment,
        date,
      },
    ],
  };

  wsServer.emit("newReview", responseReview);
};

export default addReviewForLoggedInUser;
