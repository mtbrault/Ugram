// const authService = require('../services/authService');
const userService = require('../services/userService');
const { to, rerr } = require('../middlewares/utils');

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

const tokeninfo = async (req, res, next) => {
	return res.status(204).send();
};

const google = async (req, res, next) => {
	return res.status(200).json({status: "OK"}); // not impl
};

module.exports = {
	login,
	register,
	tokeninfo,
	google
};
