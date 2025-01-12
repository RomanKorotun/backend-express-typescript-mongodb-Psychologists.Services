import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import { HttpError } from "../../helpers/index.js";
import "dotenv/config.js";

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_TIME,
} = process.env;

const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  if (!ACCESS_TOKEN_SECRET || !ACCESS_TOKEN_TIME) {
    throw HttpError(
      500,
      "ACCESS_TOKEN_SECRET or ACCESS_TOKEN_TIME is undefined"
    );
  }

  if (!REFRESH_TOKEN_SECRET || !REFRESH_TOKEN_TIME) {
    throw HttpError(
      500,
      "REFRESH_TOKEN_SECRET or REFRESH_TOKEN_TIME is undefined"
    );
  }

  const avatarDefault =
    "https://res.cloudinary.com/drqeo1pu5/image/upload/v1736688386/psychologists.services/avatars/images_hy6aoo.png";

  const hashPassword = await bcryptjs.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatar: avatarDefault,
  });

  const payload = {
    id: newUser._id,
  };

  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_TIME,
  });

  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_TIME,
  });

  const newUserUpdate = await User.findByIdAndUpdate(newUser._id, {
    accessToken,
    refreshToken,
  });

  res.status(201).json({
    username: newUserUpdate?.username,
    email: newUserUpdate?.email,
    accessToken: newUserUpdate?.accessToken,
    refreshToken: newUserUpdate?.refreshToken,
    avatar: newUser?.avatar,
  });
};

export default signup;
