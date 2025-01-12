import { Response } from "express";
import fs from "fs/promises";
import { ICustomerRequest } from "../../interfaces/authInterfaces";
import { cloudinary, HttpError } from "../../helpers/index.js";
import User from "../../models/User.js";

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
