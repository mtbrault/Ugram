const { rerr, to } = require('../middlewares/utils');
const userService = require('../services/userService');

const funcStore = {
	isValidUserId: {},
	isValidPostId: {}
};

const isValidUserId = (key="id") => {
	let func = funcStore.isValidUserId[key];
	if (!func) {
		func = async (req, res, next) => {
			if(!req.params[key])
				return rerr(next, "isAdminOrLoggedUser should be used on a route with the given key");
			const [err, user] = await to(userService.getById(req.params[key]));
			if(err || !user)
				return rerr(next, "Bad user id", 400);
			req.refUser = user;
			next();
		};
		funcStore.isValidUserId[key] = func;
	}
	return func;
}

// Should be used only after isValidUserId
const isAdminOrLoggedUser = async (req, res, next) => {
	if(!req.user._id.equals(req.refUser._id) && !req.user.isadmin)
		return rerr(next, "Forbidden", 403);
	next();
};

const isAdmin = async (req, res, next) => {
	if(!req.user)
		return rerr(next, "no user given by passport");
	if(!req.user.isadmin)
		return rerr(next, "Forbidden", 403);
	next();
}

module.exports = {
	isValidUserId,
	isAdminOrLoggedUser,
	isAdmin
};
