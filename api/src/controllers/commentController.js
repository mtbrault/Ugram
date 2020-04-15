const commentService = require("../services/commentService");
const { to, rerr } = require("../middlewares/utils");

// Comments

// Authenticated calls

// User only after isValidPostId
const create = async (req, res, next) => {
	const [err, comment] = await to(commentService.create(req.user, req.refPost, req.body));
	if (err) return rerr(next, err);
	return res.status(201).json(comment.toWeb(req.user));
};

// Use only after extractPageParams
const getSelf = async (req, res, next) => {
	const [err, ret] = await to(commentService.getByAuthor(req.user, req.skip, req.limit));
	if (err) return rerr(next, err);
	const { last, comments } = ret;
	const chunk = {
		page: req.page,
		limit: req.limit,
		count: comments.length,
		comments: comments.map((x) => x.toWeb(req.user)),
	};
	if (!last) chunk.next = `/self/comment?page=${req.page + 1}&limit=${req.limit}`;
	return res.status(200).json(chunk);
};

// User only after isValidUserId and extractPageParams
const getByUser = async (req, res, next) => {
	const [err, ret] = await to(commentService.getByAuthor(req.refUser, req.skip, req.limit));
	if (err) return rerr(next, err);
	const { last, comments } = ret;
	const chunk = {
		page: req.page,
		limit: req.limit,
		count: comments.length,
		comments: comments.map((x) => x.toWeb(req.user)),
	};
	if (!last)
		chunk.next = `/user/${req.refUser._id}/comment?page=${req.page + 1}&limit=${req.limit}`;
	return res.status(200).json(chunk);
};

// User only after isValidPostId and extractPageParams
const getByPost = async (req, res, next) => {
	const [err, ret] = await to(commentService.getByPost(req.refPost, req.skip, req.limit));
	if (err) return rerr(next, err);
	const { last, comments } = ret;
	const chunk = {
		page: req.page,
		limit: req.limit,
		count: comments.length,
		comments: comments.map((x) => x.toWeb(req.user)),
	};
	if (!last)
		chunk.next = `/post/${req.refPost._id}/comment?page=${req.page + 1}&limit=${req.limit}`;
	return res.status(200).json(chunk);
};

// Use only after isValidCommentId
const getById = async (req, res, _next) => {
	return res.status(200).json(req.refComment.toWeb(req.user));
};

// Use only after isValidCommentId
const upvote = async (req, res, next) => {
	const [err, ret] = await to(commentService.upvote(req.refComment, req.user));
	if (err) return rerr(next, err);
	const { modified, comment } = ret;
	if (!modified) return rerr(next, "comment already upvoted by user", 400);
	return res.status(200).json(comment.toWeb(req.user));
};

// Use only after isValidCommentId
const downvote = async (req, res, next) => {
	const [err, ret] = await to(commentService.downvote(req.refComment, req.user));
	if (err) return rerr(next, err);
	const { modified, comment } = ret;
	if (!modified) return rerr(next, "comment already downvoted by user", 400);
	return res.status(200).json(comment.toWeb(req.user));
};

// Use only after isValidCommentId
const unvote = async (req, res, next) => {
	const [err, ret] = await to(commentService.unvote(req.refComment, req.user));
	if (err) return rerr(next, err);
	const { modified, comment } = ret;
	if (!modified) return rerr(next, "user never voted on this comment", 400);
	return res.status(200).json(comment.toWeb(req.user));
};

// Use only after isValidCommentId
const update = async (req, res, next) => {
	const [err, comment] = await to(
		commentService.update(req.refComment, req.body, !!parseInt(req.query.merge, 10)),
	);
	if (err) return rerr(next, err);
	return res.status(200).json(comment.toWeb(req.user));
};

// Use only after isValidCommentId
const remove = async (req, res, next) => {
	const [err] = await to(commentService.remove(req.refComment));
	if (err) return rerr(next, err, 500);
	return res.status(204).send();
};

module.exports = {
	create,
	getSelf,
	getByUser,
	getByPost,
	getById,
	upvote,
	downvote,
	unvote,
	update,
	remove,
};
