const to = (p, base_err = null) => {
	return p
		.then(data => [null, data])
		.catch(err => {
			if (base_err) Object.assign(err, base_err);
			return [err, undefined];
		});
};

const asyncForEach = async (array, callback) => {
	for (let i = 0; i < array.length; i++) {
		await callback(array[i], i, array);
	}
};

const rerr = (next, err, code=500) => {
	if(typeof err == 'string')
		err = new Error(err);
	if(!err.status)
		err.status = code;
	next(err);
};

const terr = (message, code=500) => {
	const err = new Error(message);
	err.status = code;
	throw err;
};

const notEmpty = x => {
	return Array.isArray(x) && x.length > 0;
};

module.exports = {
	to,
	asyncForEach,
	rerr,
	terr,
	notEmpty
};
