const { rerr, to } = require('../middlewares/utils');
const userService = require('../services/userService');
const postService = require('../services/postService');
const commentService = require('../services/commentService');

const funcStore = {
	isValidUserId: {},
	isValidPostId: {},
	isValidCommentId: {},
};

const isValidPostId = (key="id") => {
	let func = funcStore.isValidPostId[key];
	if (!func) {
		func = async (req, res, next) => {
			if(!req.params[key])
				return rerr(next, "isValidPostId should be used on a route with the given key");
			const [err, post] = await to(postService.getById(req.params[key]));
			if (err || !post)
				return rerr(next, "Post not found", 404);
			req.refPost = post;
			next();
		};
		funcStore.isValidPostId[key] = func;
	}
	return func;
};

const isValidUserId = (key="id") => {
	let func = funcStore.isValidUserId[key];
	if (!func) {
		func = async (req, res, next) => {
			if(!req.params[key])
				return rerr(next, "isValidUserId should be used on a route with the given key");
			const [err, user] = await to(userService.getById(req.params[key]));
			if(err || !user)
				return rerr(next, "User not found", 404);
			req.refUser = user;
			next();
		};
		funcStore.isValidUserId[key] = func;
	}
	return func;
};

const isValidCommentId = (key="id") => {
	let func = funcStore.isValidCommentId[key];
	if (!func) {
		func = async (req, res, next) => {
			if(!req.params[key])
				return rerr(next, "isValidCommentId should be used on a route with the given key");
			const [err, comment] = await to(commentService.getById(req.params[key]));
			if(err || !comment)
				return rerr(next, "Comment not found", 404);
			req.refComment = comment;
			next();
		};
		funcStore.isValidCommentId[key] = func;
	}
	return func;
};

// Should be used only after isValidUserId
const isAdminOrLoggedUser = async (req, res, next) => {
	if(!req.user._id.equals(req.refUser._id) && !req.user.isadmin)
		return rerr(next, "Forbidden", 403);
	next();
};

// Should be used only after isValidPostId
const isAdminOrPostAuthor = async (req, res, next) => {
	const author = req.refPost.author.id;
	if(!req.user._id.equals(author) && !req.user.isadmin)
		return rerr(next, "Forbidden", 403);
	next();
};

// Should be used only after isValidCommentId
const isAdminOrCommentAuthor = async (req, res, next) => {
	const author = req.refComment.author.id;
	if(!req.user._id.equals(author) && !req.user.isadmin)
		return rerr(next, "Forbidden", 403);
	next();
};

const isAdmin = async (req, res, next) => {
	if(!req.user)
		return rerr(next, "no user given by passport");
	if(!req.user.isadmin)
		return rerr(next, "Forbidden", 403);
	next();
};

module.exports = {
	isValidUserId,
	isAdminOrLoggedUser,
	isValidPostId,
	isValidCommentId,
	isAdminOrPostAuthor,
	isAdminOrCommentAuthor,
	isAdmin
};
