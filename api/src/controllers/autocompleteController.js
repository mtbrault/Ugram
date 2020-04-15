const autocompleteService = require("../services/autocompleteService");
const { to, rerr } = require("../middlewares/utils");

const getAll = async (req, res, next) => {
	const [err, ret] = await to(autocompleteService.getAll(req.params.string));
	if (err) return rerr(next, err);
	return res.status(200).json(ret);
};

module.exports = {
	getAll,
};
