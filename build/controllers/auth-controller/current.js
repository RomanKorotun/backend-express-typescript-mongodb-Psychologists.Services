export const current = async (req, res) => {
    res.json({
        username: req.user.username,
        email: req.user.email,
        avatar: req.user.avatar,
    });
};
//# sourceMappingURL=current.js.map