const to = (p, baseErr = null) => {
	return p
		.then((data) => [null, data])
		.catch((err) => {
			if (baseErr) Object.assign(err, baseErr);
			return [err, undefined];
		});
};

const rerr = (next, err, code = 500) => {
	if (typeof err === "string") err = new Error(err);
	if (!err.status) err.status = code;
	next(err);
};

const terr = (message, code = 500) => {
	const err = new Error(message);
	err.status = code;
	throw err;
};

const notEmpty = (x) => {
	return Array.isArray(x) && x.length > 0;
};

module.exports = {
	to,
	rerr,
	terr,
	notEmpty,
};
