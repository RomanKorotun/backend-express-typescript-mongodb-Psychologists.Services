import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/index.js";

const isValid = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(HttpError(400, `${id} in not valid id`));
  }
  next();
};

export default isValid;
