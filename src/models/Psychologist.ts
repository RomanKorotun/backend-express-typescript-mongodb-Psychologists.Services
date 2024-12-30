import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleAddSettings, handleSaveError } from "./hooks.js";
import { IPsychologistsDocument } from "../interfaces/psychologistsInterfaces.js";

const PsychologistsSchema = new Schema<IPsychologistsDocument>(
  {
    name: { type: String, required: true },
    avatar_url: { type: String, required: true },
    experience: { type: String, required: true },
    reviews: [
      {
        reviewer: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        date: { type: String, required: true },
      },
    ],
    price_per_hour: { type: String, required: true },
    rating: { type: Number, required: true },
    license: { type: String, required: true },
    specialization: { type: String, required: true },
    initial_consultation: { type: String, required: true },
    about: { type: String, required: true },
    owner: { type: [String], required: true },
  },
  { versionKey: false, timestamps: true }
);

PsychologistsSchema.pre("findOneAndUpdate", handleAddSettings);
PsychologistsSchema.post("findOneAndUpdate", handleSaveError);

export const psychologistReviewSchema = Joi.object({
  rating: Joi.number().required(),
  comment: Joi.string().required(),
});

const Psychologist = model<IPsychologistsDocument>(
  "psychologist",
  PsychologistsSchema
);

export default Psychologist;
