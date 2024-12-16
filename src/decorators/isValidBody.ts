import { NextFunction, Request, Response } from "express";
import { HttpError } from "../helpers/index.js";
import { Schema } from "joi";

const isValidBody = (schema: Schema) => {
  const func = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};
export default isValidBody;
