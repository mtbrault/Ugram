const userService = require('../services/userService');
const { to, rerr } = require('../middlewares/utils');


//USERS
const login = async (req, res, next) => {
	let [err, user] = await to(userService.authenticate(req.body));
	if (err)
		return rerr(next, err, 401);
	return res.status(200).json({ token: user.getJWT(), ...user.toWeb() });
}

const register = async (req, res, next) => {
	let [err, user] = await to(userService.create(req.body));
	if (err)
		return rerr(next, err, 400);
	return res.status(201).json({ token: user.getJWT(), ...user.toWeb() });
}


// Authenticated calls

const get = async (req, res, next) => {
	let user = req.user;
	if(!user)
		return rerr(next, "no user given by passport");
	return res.status(200).json(user.toWeb());
};


// TODO: Update function
// const update = async (req, res, next) => {
// 	let user = req.user;
// 	if(!user)
// 			return rerr(res, "no user given by passport", 500);
// };

const remove = async (req, res, next) => {
	let err, user;
	user = req.user;
	if(!user)
		return rerr(next, "no user given by passport");
	[err, user] = await to(userService.remove(user));
	if(err)
		return rerr(next, err);
	return res.status(204).send();
};

const removeById = async (req, res, next) => {
	let err, user;
	user = req.user;
	if(!user)
		return rerr(next, "no user given by passport");
	const id = req.params.id;
	if(user.id != id && !user.isadmin)
		return rerr(next, "Forbidden", 403);
	[err, user] = await to(userService.removeById(id));
	if(err)
		return rerr(next, err, 400);
	return res.status(204).send();
};

module.exports = {
	login,
	register,
	get,
	remove,
	removeById
};
