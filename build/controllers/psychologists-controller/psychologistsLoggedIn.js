import Psychologist from "../../models/Psychologist.js";
import generateSort from "../../helpers/generateSort.js";
const psychologistsLoggedIn = async (req, res) => {
    const { email } = req.user;
    const { name, price, popular } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;
    const sort = generateSort(name, price, popular);
    const psychologistsPagination = await Psychologist.find({
        $or: [{ owner: { $size: 0 } }, { owner: { $in: [email] } }],
    }, "-updatedAt")
        .sort(sort)
        .skip(skip)
        .limit(limit);
    const allPsychologists = await Psychologist.find({});
    const pagesQuintity = Math.ceil(allPsychologists.length / limit);
    res.json({
        items: psychologistsPagination,
        pagesQuintity,
    });
};
export default psychologistsLoggedIn;
//# sourceMappingURL=psychologistsLoggedIn.js.map