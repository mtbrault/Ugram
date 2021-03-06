const postService = require("../services/postService");
const { to, rerr } = require("../middlewares/utils");

// POSTS

// Authenticated calls

const upload = async (req, res, next) => {
	const [err, post] = await to(postService.create(req.user, req.body));
	if (err) return rerr(next, err);
	return res.status(201).json(post.toWeb(req.user));
};

// Use only after isValidUserId
const uploadForUser = async (req, res, next) => {
	const [err, post] = await to(postService.create(req.refUser, req.body));
	if (err) return rerr(next, err);
	return res.status(201).json(post.toWeb(req.refUser));
};

// Use only after extractPageParams
const getAll = async (req, res, next) => {
	const [err, ret] = await to(postService.getAll(req.skip, req.limit, {}, req.requestParam));
	if (err) return rerr(next, err);
	const { last, posts } = ret;
	const chunk = {
		page: req.page,
		limit: req.limit,
		count: posts.length,
		posts: posts.map((x) => x.toWeb(req.user)),
	};
	if (!last) chunk.next = `/post?page=${req.page + 1}&limit=${req.limit}`;
	return res.status(200).json(chunk);
};

// Use only after extractPageParams
const getSelf = async (req, res, next) => {
	const [err, ret] = await to(postService.getByUser(req.user, req.skip, req.limit));
	if (err) return rerr(next, err);
	const { last, posts } = ret;
	const chunk = {
		page: req.page,
		limit: req.limit,
		count: posts.length,
		posts: posts.map((x) => x.toWeb(req.user)),
	};
	if (!last) chunk.next = `/self/post?page=${req.page + 1}&limit=${req.limit}`;
	return res.status(200).json(chunk);
};

// Use only after isValidUserId and extractPageParams
const getByUser = async (req, res, next) => {
	const [err, ret] = await to(postService.getByUser(req.refUser, req.skip, req.limit));
	if (err) return rerr(next, err);
	const { last, posts } = ret;
	const chunk = {
		page: req.page,
		limit: req.limit,
		count: posts.length,
		posts: posts.map((x) => x.toWeb(req.user)),
	};
	if (!last) chunk.next = `/user/${req.refUser._id}/post?page=${req.page + 1}&limit=${req.limit}`;
	return res.status(200).json(chunk);
};

// Use only after extractDateParams and extractPageParams and extractKeywordParams
const getKeyword = async (req, res, next) => {
	const [err, ret] = await to(postService.getKeyword(req.skip, req.limit, req.dateLimit));
	if (err) return rerr(next, err);
	const { last, keywords } = ret;
	const chunk = {
		page: req.page,
		limit: req.limit,
		count: keywords.length,
		keywords,
	};
	if (!last)
		chunk.next = `/keyword?page=${req.page + 1}&limit=${req.limit}&date=${req.dateLimit}`;
	return res.status(200).json(chunk);
};

// Use only after isValidPostId
const getById = (req, res, _next) => {
	return res.status(200).json(req.refPost.toWeb(req.user));
};

// Use only after isValidPostId
const upvote = async (req, res, next) => {
	const [err, ret] = await to(postService.upvote(req.refPost, req.user));
	if (err) return rerr(next, err);
	const { modified, post } = ret;
	if (!modified) return rerr(next, "post already upvoted by user", 400);
	return res.status(200).json(post.toWeb(req.user));
};

// Use only after isValidPostId
const downvote = async (req, res, next) => {
	const [err, ret] = await to(postService.downvote(req.refPost, req.user));
	if (err) return rerr(next, err);
	const { modified, post } = ret;
	if (!modified) return rerr(next, "post already downvoted by user", 400);
	return res.status(200).json(post.toWeb(req.user));
};

// Use only after isValidPostId
const unvote = async (req, res, next) => {
	const [err, ret] = await to(postService.unvote(req.refPost, req.user));
	if (err) return rerr(next, err);
	const { modified, post } = ret;
	if (!modified) return rerr(next, "user never voted on this post", 400);
	return res.status(200).json(post.toWeb(req.user));
};

// Use only after isValidPostId
const update = async (req, res, next) => {
	const [err, post] = await to(
		postService.update(req.refPost, req.body, !!parseInt(req.query.merge, 10)),
	);
	if (err) return rerr(next, err);
	return res.status(200).json(post.toWeb(req.user));
};

// Use only after isValidPostId
const remove = async (req, res, next) => {
	const [err] = await to(postService.remove(req.refPost));
	if (err) return rerr(next, err, 500);
	return res.status(204).send();
};

module.exports = {
	upload,
	uploadForUser,
	getAll,
	getSelf,
	getByUser,
	getById,
	upvote,
	downvote,
	unvote,
	getKeyword,
	remove,
	update,
};
