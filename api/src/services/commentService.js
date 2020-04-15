const { User, Comment, Notification } = require("../db");
const { to, terr, notEmpty } = require("../middlewares/utils");

const create = async (author, target, { content, hashtags, mentions }) => {
	if (!content || !content.trim()) terr("content field is required", 400);

	if (notEmpty(mentions)) {
		mentions = mentions.map((x) => {
			const username = x.toLowerCase();
			if (username === author.username) terr("User cannot mention himself", 400);
			return username;
		});
		const [err, users] = await to(User.find({ username: { $in: mentions } }).lean());
		if (err || users.length !== mentions.length) terr("Unknown Username in mentions", 400);
		mentions = users.map((x) => {
			return {
				id: x._id,
				username: x.username,
			};
		});
	} else {
		mentions = [];
	}

	notEmpty(hashtags) || (hashtags = []);

	const comment = new Comment({
		author: { id: author._id, username: author.username },
		target: target._id,
		content,
		hashtags,
		mentions,
	});
	const session = await Comment.startSession();
	await session.withTransaction(async () => {
		await comment.save({ session });
		if (!author._id.equals(target.author.id)) {
			await Notification.create(
				[
					{
						userId: target.author.id,
						text: `${author.displayname} commented one of your posts`,
					},
				],
				{
					session,
				},
			);
		}
	});
	await session.endSession();
	return comment;
};

const getAll = async (skip, limit, query = {}) => {
	const comments = await Comment.find(query)
		.sort("-createdAt")
		.skip(skip)
		.limit(limit + 1);
	const last = comments.length !== limit + 1;
	if (!last) comments.pop();
	return { last, comments };
};

const getByAuthor = (author, skip, limit) => {
	return getAll(skip, limit, { "author.id": author._id || author });
};

const getByPost = (post, skip, limit) => {
	return getAll(skip, limit, { target: post._id || post });
};

const getById = (id) => {
	return Comment.findById(id);
};

const upvote = async (comment, user) => {
	if (comment.upvoted(user)) return { modified: false, comment };
	comment.upvote(user);
	await comment.save();
	return { modified: true, comment };
};

const downvote = async (comment, user) => {
	if (comment.downvoted(user)) return { modified: false, comment };
	comment.downvote(user);
	await comment.save();
	return { modified: true, comment };
};

const unvote = async (comment, user) => {
	if (!comment.voted(user).voted) return { modified: false, comment };
	comment.unvote(user);
	await comment.save();
	return { modified: true, comment };
};

const update = async (comment, { content, hashtags, mentions }, merge = false) => {
	if (Array.isArray(mentions)) {
		if (mentions.length > 0) {
			mentions = mentions.map((x) => x.toLowerCase());
			const [err, users] = await to(User.find({ username: { $in: mentions } }).lean());
			if (err || users.length !== mentions.length) terr("Unknown Username in mentions", 400);
			mentions = users.map((x) => {
				if (comment.author.id.equals(x._id)) terr("User cannot mention himself", 400);
				return {
					id: x._id,
					username: x.username,
				};
			});
		}

		if (!merge) {
			comment.mentions = mentions;
		} else if (mentions.length > 0) {
			comment.mentions.addToSet(...mentions);
		}
	}

	if (content && content.trim()) comment.content = content;
	if (Array.isArray(hashtags)) {
		if (!merge) {
			comment.hashtags = hashtags;
		} else if (hashtags.length > 0) {
			comment.hashtags.addToSet(...hashtags);
		}
	}

	comment = await comment.save();
	return comment;
};

const remove = async (comment) => {
	return Comment.findByIdAndDelete(comment._id);
};

module.exports = {
	create,
	getByAuthor,
	getByPost,
	getById,
	upvote,
	downvote,
	unvote,
	update,
	remove,
};
