import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleAddSettings, handleSaveError } from "./hooks.js";

const ReservedTimeSchema = new Schema(
  {
    psychologistId: { type: Schema.Types.ObjectId, required: true },
    clientId: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    isReserved: { type: Boolean, default: true },
  },
  { versionKey: false, timestamps: true }
);

ReservedTimeSchema.post("save", handleSaveError);
ReservedTimeSchema.pre("findOneAndUpdate", handleAddSettings);
ReservedTimeSchema.post("findOneAndUpdate", handleSaveError);

export const addReservedTimeSchema = Joi.object({
  psychologistId: Joi.string().required(),
  clientId: Joi.string().required(),
  date: Joi.string().required(),
  time: Joi.string().required(),
});

const ReservedTime = model("reservedTime", ReservedTimeSchema);
export default ReservedTime;
