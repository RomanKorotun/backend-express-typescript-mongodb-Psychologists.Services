import { Response } from "express";
import { ICustomerRequest } from "../../interfaces/authInterfaces";

export const current = async (req: ICustomerRequest, res: Response) => {
  res.json({
    username: req.user.username,
    email: req.user.email,
    avatar: req.user.avatar,
  });
};
