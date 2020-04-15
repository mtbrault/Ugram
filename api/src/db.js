/* eslint-disable no-console */
const mongoose = require("mongoose");
const pe = require("parse-error");
const { db } = require("./config");
const { to } = require("./middlewares/utils");

const userpass = db.user && db.password ? `${db.user}:${db.password}@` : "";
const dbparams = db.params ? `?${db.params}` : "";
const dbport = db.dialect === "mongodb+srv" ? "" : `:${db.port}`;
const dbUrl = `${db.dialect}://${userpass}${db.host}${dbport}/${db.name}${dbparams}`;

// Mongoose settings
const settings = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
};
for (const [key, value] of Object.entries(settings)) mongoose.set(key, value);

// Exported models
const models = {
	User: require("./models/userModel"),
	Post: require("./models/postModel"),
	Comment: require("./models/commentModel"),
	Notification: require("./models/notificationModel"),
	Keyword: require("./models/keywordModel"),
};

// Database connection
mongoose.connect(dbUrl).then(
	() => {
		console.log("Connected to mongoDB");
	},
	(e) => {
		console.error("Error while DB connecting: ", pe(e));
		throw e;
	},
);

// Initialize collections
(async () => {
	const ops = Object.values(models).map((model) => model.createCollection());
	const [err] = await to(Promise.all(ops));
	if (err) throw new Error("Error while creating collections");
})();

module.exports = {
	...models,
	connection: mongoose.connection,
};
