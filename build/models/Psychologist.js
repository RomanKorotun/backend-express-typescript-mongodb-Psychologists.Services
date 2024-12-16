import { Schema, model } from "mongoose";
import { handleAddSettings, handleSaveError } from "./hooks.js";
const PsychologistsSchema = new Schema({
    name: { type: String, required: true },
    avatar_url: { type: String, required: true },
    experience: { type: String, required: true },
    reviews: [
        {
            reviewer: { type: String, required: true },
            rating: { type: String, required: true },
            comment: { type: String, required: true },
        },
    ],
    price_per_hour: { type: String, required: true },
    rating: { type: String, required: true },
    license: { type: String, required: true },
    specialization: { type: String, required: true },
    initial_consultation: { type: String, required: true },
    about: { type: String, required: true },
    owner: { type: [String], required: true },
}, { versionKey: false, timestamps: true });
PsychologistsSchema.pre("findOneAndUpdate", handleAddSettings);
PsychologistsSchema.post("findOneAndUpdate", handleSaveError);
const Psychologist = model("psychologist", PsychologistsSchema);
export default Psychologist;
//# sourceMappingURL=Psychologist.js.map