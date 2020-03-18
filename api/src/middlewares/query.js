const { api } = require('../config');

let conv = parseInt(api.defaultPageSize, 10) || 20;
const defaultPageSize = conv < 1 ? 20 : conv;

conv = parseInt(api.maxPageSize, 10) || 100;
const maxPageSize = conv < defaultPageSize ? defaultPageSize : conv;

function formatRegKeyValue (key, value, isWildcard) {
	let obj = {};
	if (isWildcard)
		obj[key] = new RegExp(`.*${value}.*`, "i");
	else
		obj[key] = value;
	return obj;
}

const extractQueryParams = (req, res, next, listParam) => {
	req.requestParam = [];
	Object.keys(req.query).forEach(function (key) {
		for (param of listParam) {
			if (key === param.name) {
				req.requestParam.push(formatRegKeyValue(param.name, req.query[key], param.isWild));
			} else if (key === "content") {
				req.requestParam.push(formatRegKeyValue(param.name, req.query.content, true));
			}
		}
	});
	next();
};

const extractUserParams = (req, res, next) => {
	extractQueryParams(req, res, next,
		[{name: "displayname", isWild: true}, {name: "username", isWild: true},
			{name: "firstname", isWild: true}, {name: "lastname", isWild: true},
			{name: "email", isWild: true}]);
};

const extractPostParams = (req, res, next) => {
	extractQueryParams(req, res, next, [{name: "hashtags", isWild: false},
		{name: "description", isWild: true}]);
};

const extractPageParams = (req,res,next) => {
	req.page = req.query.page ? parseInt(req.query.page, 10) : 0;
	if(isNaN(req.page) || req.page < 0)
		req.page = 0;
	req.limit = req.query.limit ? parseInt(req.query.limit, 10) || 0 : defaultPageSize;
	if (req.limit < 1 || req.limit > maxPageSize)
		req.limit = maxPageSize;
	req.skip = req.query.page * req.query.limit;
	next();
};

module.exports = {
	extractPageParams,
	extractUserParams,
	extractPostParams
};
