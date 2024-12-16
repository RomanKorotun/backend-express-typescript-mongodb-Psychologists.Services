import { HttpError } from "../helpers/index.js";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import User from "../models/User.js";
const { ACCESS_TOKEN_SECRET } = process.env;
const authenticate = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return next(HttpError(401, "Authorization is missing"));
    }
    const [Bearer, access_Token] = authorization.split(" ");
    if (Bearer !== "Bearer") {
        return next(HttpError(401, "Bearer is missing"));
    }
    try {
        if (!ACCESS_TOKEN_SECRET) {
            return next(HttpError(500, "ACCESS_TOKEN_SECRET is undefined"));
        }
        const payload = jwt.verify(access_Token, ACCESS_TOKEN_SECRET);
        const user = await User.findById(payload.id);
        if (!user || user.accessToken !== access_Token || !user.accessToken) {
            return next(HttpError(401));
        }
        req.user = user;
        next();
    }
    catch (error) {
        next(HttpError(401, error.message));
    }
};
export default authenticate;
//# sourceMappingURL=authenticate.js.map