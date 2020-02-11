const { rerr } = require('../middlewares/utils');

const isAdminOrLoggedUser = async (req, res, next) => {
	if(!req.user)
		return rerr(next, "no user given by passport");
	if(!req.params.id)
		return rerr(next, "isAdminOrLoggedUser should be used on a route with :id");
	if(req.params.id != req.user._id && !req.user.isadmin)
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
	isAdminOrLoggedUser,
	isAdmin
};
