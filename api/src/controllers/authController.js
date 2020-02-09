// const authService = require('../services/authService');
const { to, rerr } = require('../middlewares/utils');

const tokeninfo = async (req, res, next) => {
	res.status(204).send();
};

module.exports = {
	tokeninfo
};
