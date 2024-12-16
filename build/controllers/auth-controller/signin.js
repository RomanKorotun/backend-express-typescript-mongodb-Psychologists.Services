import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import { HttpError } from "../../helpers/index.js";
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME, } = process.env;
const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "email or password is wrong");
    }
    const passwordCompare = await bcryptjs.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "email or password is wrong");
    }
    if (!ACCESS_TOKEN_SECRET || !ACCESS_TOKEN_TIME) {
        throw HttpError(500, "ACCESS_TOKEN_SECRET or ACCESS_TOKEN_TIME is undefined");
    }
    if (!REFRESH_TOKEN_SECRET || !REFRESH_TOKEN_TIME) {
        throw HttpError(500, "REFRESH_TOKEN_SECRET or REFRESH_TOKEN_TIME is undefined");
    }
    const id = user._id;
    const payload = {
        id,
    };
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_TIME,
    });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_TIME,
    });
    const userUpdate = await User.findByIdAndUpdate(id, {
        accessToken,
        refreshToken,
    });
    res.json({
        username: userUpdate?.username,
        email: userUpdate?.email,
        accessToken: userUpdate?.accessToken,
        refreshToken: userUpdate?.refreshToken,
        avatar: userUpdate?.avatar,
    });
};
export default signin;
//# sourceMappingURL=signin.js.map