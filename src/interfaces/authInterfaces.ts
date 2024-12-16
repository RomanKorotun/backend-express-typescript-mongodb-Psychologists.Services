import { Request } from "express";
import { Document } from "mongoose";

export interface ICustomerRequest extends Request {
  user?: any;
}

export interface IUserDocument extends Document {
  username: string;
  email: string;
  password: string;
  avatar: string;
  accessToken: string;
  refreshToken: string;
}
