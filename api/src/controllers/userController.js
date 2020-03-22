const userService = require('../services/userService');
const { to, rerr } = require('../middlewares/utils');

// *** All these calls should be Authenticated calls, use only after Passport middleware ***

const get = async (req, res, next) => {
	return res.status(200).json(req.user.toWeb());
};

const getAll = async (req, res, next) => {
	const noself = parseInt(req.query.noself, 10) ? req.user._id : false;
	const [err, ret] = await to(userService.getAll(req.skip, req.limit, noself, req.requestParam));
	if(err)
		return rerr(next, err);
	const {last, users} = ret;
	const chunk = {
		page: req.page,
		limit: req.limit,
		count: users.length,
		users
	};
	if(!last)
		chunk.next = `/user/search?page=${req.page + 1}&limit=${req.limit}${req.query.noself ? "&noself=" + req.query.noself : ""}`;
	return res.status(200).json(chunk);
};

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
	get,
	getById,
	getAll,
	update,
	updateById,
	remove,
	removeById,
};
