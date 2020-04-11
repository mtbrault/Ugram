const { Comment } = require("../db");
const { to, terr, notEmpty } = require("../middlewares/utils");

const create = async (author, target, { content, hashtags, mentions }) => {
	if (!content || !content.trim())
		terr("content field is required", 400);

	if (notEmpty(mentions)) {
		mentions = mentions.map(x => {
			const username = x.toLowerCase();
			if (username === author.username)
				terr("User cannot mention himself", 400);
			return username;
		});
		const [err, users] = await to(User.find({ username: { $in: mentions } }).lean());
		if (err || users.length !== mentions.length)
			terr("Unknown Username in mentions", 400);
		mentions = users.map(x => {
			return {
				id: x._id,
				username: x.username
			};
		});
	} else {
		mentions = [];
	}

	notEmpty(hashtags) || (hashtags = []);

	let comment = new Comment({
		author: { id: author._id, username: author.username },
		target: target._id, content, hashtags, mentions
	});
	comment = await comment.save();
	return comment;
};

const getAll = async (skip, limit, query = {}) => {
	const comments = await Comment.find(query).sort("-createdAt").skip(skip).limit(limit+1);
	const last = comments.length !== limit + 1;
	if (!last)
		comments.pop();
	return {
		last,
		comments: comments.map(x => {
			return x.toWeb();
		})
	};
};

const getByAuthor = (author, skip, limit) => {
	return getAll(skip, limit, { "author.id": author._id || author });
}

const getByPost =  (post, skip, limit) => {
	return getAll(skip, limit, { "target": post._id || post });
};

const getById = (id) => {
	return Comment.findById(id);
};

const update = async (comment, { content, hashtags, mentions }, merge=false) => {
	if (Array.isArray(mentions)) {
		if (mentions.length > 0) {
			mentions = mentions.map(x => x.toLowerCase());
			const [err, users] = await to(User.find({ username: { $in: mentions } }).lean());
			if (err || users.length !== mentions.length)
				terr("Unknown Username in mentions", 400);
			mentions = users.map(x => {
				if (comment.author.id.equals(x._id))
					terr("User cannot mention himself", 400);
				return {
					id: x._id,
					username: x.username
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

const remove = async comment => {
	return Comment.findByIdAndDelete(comment._id);
};

module.exports = {
	create,
	getByAuthor,
	getByPost,
	getById,
	update,
	remove
}
