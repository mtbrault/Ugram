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
}

const rerr = (next, err, code=500) => {
	if(typeof err == 'string')
		err = new Error(err);
	err.status = code;
	next(err);
};

module.exports = {
	to,
	asyncForEach,
	rerr
};
