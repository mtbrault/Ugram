/* eslint-disable no-console */
const mongoose = require("mongoose");
const pe = require("parse-error");
const { db } = require("./config");
const userpass = db.user && db.password ? `${db.user}:${db.password}@` : "";
const dbparams = db.params ? `?${db.params}` : "";
const dbport = db.dialect === "mongodb+srv" ? "" : `:${db.port}`;
const dbUrl = `${db.dialect}://${userpass}${db.host}${dbport}/${db.name}${dbparams}`;

const settings = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
};

for (const [key, value] of Object.entries(settings)) mongoose.set(key, value);

mongoose.connect(dbUrl).then(
	() => {
		console.log("Connected to mongoDB");
	},
	(e) => {
		console.error("Error while DB connecting: ", pe(e));
		throw e;
	},
);

module.exports = {
	User: require("./models/userModel"),
	Post: require("./models/postModel"),
	Comment: require("./models/commentModel"),
	Notification: require("./models/notificationModel"),
	Keyword: require("./models/keywordModel"),
	connection: mongoose.connection,
};
