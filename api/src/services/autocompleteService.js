const { User, Keyword } = require("../db");

const getAll = async (string) => {
	const keyword = await Keyword.find({ word: new RegExp(`^${string}`, "i") }).limit(10);
	const user = await User.find({ username: new RegExp(`^${string}`, "i") }).limit(10);
	const finalArray = [];

	for (const val of user) {
		if (finalArray.length < 10) {
			finalArray.push(val.username);
		}
	}

	for (const val of keyword) {
		if (finalArray.length < 10) {
			finalArray.push(`#${val.word}`);
		}
	}

	finalArray.sort(function (a, b) {
		const trueSizeA = a[0] === "#" ? a.length - 1 : a.length;
		const trueSizeB = b[0] === "#" ? b.length - 1 : b.length;
		return trueSizeA - trueSizeB;
	});
	return finalArray;
};

module.exports = {
	getAll,
};
