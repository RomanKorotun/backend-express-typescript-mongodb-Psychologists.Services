import User from "../../models/User.js";
const logout = async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        accessToken: "",
        refreshToken: "",
    });
    res.json({ message: "Logout success" });
};
export default logout;
//# sourceMappingURL=logout.js.map