import Psychologist from "../../models/Psychologist.js";
import generateSort from "../../helpers/generateSort.js";
const psychologistsFavorite = async (req, res) => {
    const { email } = req.user;
    const { name, price, popular } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;
    const sort = generateSort(name, price, popular);
    const psychologistsFavoritePagination = await Psychologist.find({ owner: { $in: [email] } }, "-updatedAt")
        .sort(sort)
        .skip(skip)
        .limit(limit);
    const allPsychologistsFavorite = await Psychologist.find({
        owner: { $in: [email] },
    });
    const pagesQuintity = Math.ceil(allPsychologistsFavorite.length / limit);
    res.json({
        items: psychologistsFavoritePagination,
        pagesQuintity,
    });
};
export default psychologistsFavorite;
//# sourceMappingURL=psychologistsFavorite.js.map