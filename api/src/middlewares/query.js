const { api } = require('../config');

let conv = parseInt(api.defaultPageSize, 10) || 20;
const defaultPageSize = conv < 1 ? 20 : conv;

conv = parseInt(api.maxPageSize, 10) || 100;
const maxPageSize = conv < defaultPageSize ? defaultPageSize : conv;

const extractParams = (req,res,next) => {
	req.page = req.query.page ? parseInt(req.query.page, 10) : 0;
	if(isNaN(req.page) || req.page < 0)
		req.page = 0;
	req.limit = req.query.limit ? parseInt(req.query.limit, 10) || 0 : defaultPageSize;
	if (req.limit < 1 || req.limit > maxPageSize)
		req.limit = maxPageSize;
	req.skip = req.query.page * req.query.limit;
	next();
}

module.exports = {
	extractParams
};
