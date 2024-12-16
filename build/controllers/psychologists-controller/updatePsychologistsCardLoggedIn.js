import Psychologist from "../../models/Psychologist.js";
const updatePsychologistsCardLoggedIn = async (req, res) => {
    const { email } = req.user;
    const { id } = req.params;
    const card = await Psychologist.findById(id);
    const idx = card?.owner.indexOf(email);
    if (idx !== -1 && idx !== undefined) {
        card?.owner.splice(idx, 1);
    }
    else {
        card?.owner.push(email);
    }
    const updateCard = await Psychologist.findByIdAndUpdate(id, {
        owner: card?.owner,
    });
    res.json(updateCard);
};
export default updatePsychologistsCardLoggedIn;
//# sourceMappingURL=updatePsychologistsCardLoggedIn.js.map