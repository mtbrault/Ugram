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

const getById = async (req, res, next) => {
	let [err, searched] = await to(userService.getById(req.params.id));
	if(err)
		return rerr(next, err, 400);
	return res.status(200).json(searched.toWeb());
};

// const getAll = async (req, res, next) => {
// 	const page = req.query.page ? req.query.page : 0;
// 	const limit = req.query.limit ? req.query.limit : 20;
// 	const [err, res] = await to(userService.getAll(page, limit));
// 	if(err)
// 		rerr(next, err, 400);
// }


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
	const id = req.params.id;
	[err, user] = await to(userService.removeById(id));
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
	remove,
	removeById
};
