import { Response } from "express";
import User from "../../models/User.js";
import { ICustomerRequest } from "../../interfaces/authInterfaces.js";

const logout = async (req: ICustomerRequest, res: Response) => {
  await User.findByIdAndUpdate(req.user._id, {
    accessToken: "",
    refreshToken: "",
  });
  res.json({ message: "Logout success" });
};
export default logout;
