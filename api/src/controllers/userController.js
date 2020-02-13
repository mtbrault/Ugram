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
		return rerr(next, err);
	return res.status(201).json({ token: user.getJWT(), ...user.toWeb() });
}

// *** From here Authenticated calls, use only after Passport middleware ***

const get = async (req, res, next) => {
	return res.status(200).json(req.user.toWeb());
};

// const getAll = async (req, res, next) => {
// 	const page = req.query.page ? req.query.page : 0;
// 	const limit = req.query.limit ? req.query.limit : 20;
// 	const [err, res] = await to(userService.getAll(page, limit));
// 	if(err)
// 		rerr(next, err, 400);
// }

const update = async (req, res, next) => {
	const [err, user] = await to(userService.update(req.user, req.body));
	if (err)
		return rerr(next, err);
	return res.status(200).json(user.toWeb());
};

const remove = async (req, res, next) => {
	const [err, user] = await to(userService.remove(req.user));
	if(err)
		return rerr(next, err);
	return res.status(204).send();
};

// *** Only use after isValidUserId middleware ***
const getById = async (req, res, next) => {
	return res.status(200).json(req.refUser.toWeb());
};

const updateById = async (req, res, next) => {
	const [err, user] = await to(userService.update(req.refUser, req.body));
	if (err)
		return rerr(next, err);
	return res.status(200).json(user.toWeb());
};

const removeById = async (req, res, next) => {
	const [err, user] = await to(userService.remove(req.refUser));
	if(err)
		return rerr(next, err, 500);
	return res.status(204).send();
};

module.exports = {
	login,
	register,
	get,
	getById,
	// getAll,
	update,
	updateById,
	remove,
	removeById,
};
