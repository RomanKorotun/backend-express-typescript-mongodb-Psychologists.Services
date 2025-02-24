import { Response } from "express";
import fs from "fs/promises";
import { ICustomerRequest } from "../../interfaces/authInterfaces";
import { cloudinary, HttpError } from "../../helpers/index.js";
import User from "../../models/User.js";
import { wsServer } from "../../app.js";
import Psychologist from "../../models/Psychologist.js";

const updateAvatar = async (req: ICustomerRequest, res: Response) => {
  try {
    if (!req.file) {
      throw HttpError(400);
    }

    const { _id } = req.user;

    if (req.file) {
      const { url: avatar } = await cloudinary.uploader.upload(req.file.path, {
        folder: "psychologists.services/avatars",
      });

      await fs.unlink(req.file.path);

      const updateUser = await User.findByIdAndUpdate(_id, {
        avatar,
      });

      if (updateUser) {
        const userId = updateUser._id as string;

        await Psychologist.updateMany(
          { "reviews.clientId": userId },
          {
            $set: {
              "reviews.$[elem].avatar": avatar,
            },
          },
          {
            arrayFilters: [{ "elem.clientId": userId }],
            multi: true,
          }
        );

        const updatedPsychologists = await Psychologist.find({
          "reviews.clientId": userId,
        }).select("_id");

        const psychologistIds = updatedPsychologists.map(
          (psychologist) => psychologist._id
        );

        const user = await User.findById(userId).select("avatar");
        console.log(user);

        wsServer.emit("updateAvatarForComment", {
          psychologistsIds: psychologistIds,
          userId: user?._id,
          newAvatar: user?.avatar,
        });
      }

      res.json({ avatar: updateUser?.avatar });
    }
  } catch (error) {
    if (req.file) {
      await fs.unlink(req.file.path);
    }
    throw error;
  }
};

export default updateAvatar;
