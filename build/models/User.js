import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleAddSettings, handleSaveError } from "./hooks.js";
const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const UserSchema = new Schema({
    username: {
        type: String,
        minlength: [2, "Too short!"],
        maxlength: [50, "Too long!"],
        required: true,
    },
    email: {
        type: String,
        unique: true,
        match: emailRegexp,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    accessToken: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
}, { versionKey: false, timestamps: true });
UserSchema.post("save", handleSaveError);
UserSchema.pre("findOneAndUpdate", handleAddSettings);
UserSchema.post("findOneAndUpdate", handleSaveError);
export const userSignupSchema = Joi.object({
    username: Joi.string()
        .min(2)
        .message("Too short")
        .max(50)
        .message("Too long")
        .required(),
    email: Joi.string().pattern(emailRegexp).message("Invalid email").required(),
    password: Joi.string().required(),
});
export const userSigninSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).message("Invalid email").required(),
    password: Joi.string().required(),
});
const User = model("user", UserSchema);
export default User;
//# sourceMappingURL=User.js.map