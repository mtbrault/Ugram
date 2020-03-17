const postService = require('../services/postService');
const { to, rerr } = require('../middlewares/utils');

//POSTS

// Authenticated calls

const upload = async (req, res, next) => {
	const [err, post] = await to(postService.create(req.user, req.body));
	if (err)
		return rerr(next, err);
	return res.status(201).json(post.toWeb());
};

// use only after isValidUserId
const uploadForUser = async (req, res, next) => {
	const [err, post] = await to(postService.create(req.refUser, req.body));
	if (err)
		return rerr(next, err);
	return res.status(201).json(post.toWeb());
};

// use only after extractParams
const getAll = async (req, res, next) => {
	const [err, ret] = await to(postService.getAll(req.skip, req.limit, req.requestParam));
	if(err)
		return rerr(next, err);
	const {last, posts} = ret;
	const chunk = {
		page: req.page,
		limit: req.limit,
		count: posts.length,
		posts
	};
	if(!last)
		chunk.next = `/post?page=${req.page + 1}&limit=${req.limit}`;
	return res.status(200).json(chunk);
};

// use only after extractParams
const getSelf = async (req, res, next) => {
	const [err, ret] = await to(postService.getByUser(req.user, req.skip, req.limit));
	if(err)
		return rerr(next, err);
	const {last, posts} = ret;
	const chunk = {
		page: req.page,
		limit: req.limit,
		count: posts.length,
		posts
	};
	if(!last)
		chunk.next = `/self/post?page=${req.page + 1}&limit=${req.limit}`;
	return res.status(200).json(chunk);
};

// use only after isValidUserId and extractParams
const getByUser = async (req, res, next) => {
	const [err, ret] = await to(postService.getByUser(req.refUser, req.skip, req.limit));
	if(err)
		return rerr(next, err);
	const {last, posts} = ret;
	const chunk = {
		page: req.page,
		limit: req.limit,
		count: posts.length,
		posts
	};
	if(!last)
		chunk.next = `/user/${req.refUser._id}/post?page=${req.page + 1}&limit=${req.limit}`;
	return res.status(200).json(chunk);
};

// use only after isValidPostId
const getById = async (req, res, next) => {
	return res.status(200).json(req.refPost.toWeb());
};

// use only after isValidPostId
const update = async (req, res, next) => {
	const [err, post] = await to(postService.update(req.refPost ,req.body, !!parseInt(req.query.merge, 10)));
	if (err)
		return rerr(next, err);
	return res.status(200).json(post.toWeb());
};

// use only after isValidPostId
const remove = async (req, res, next) => {
	const [err, post] = await to(postService.remove(req.refPost));
	if (err)
		return rerr(next, err, 500);
	return res.status(204).send();
}

module.exports = {
	upload,
	uploadForUser,
	getAll,
	getSelf,
	getByUser,
	getById,
	remove,
	update
};
