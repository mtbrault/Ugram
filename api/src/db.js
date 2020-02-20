const mongoose = require("mongoose");
const pe = require("parse-error");

const { db } = require('./config');
const db_url = `${db.dialect}://${db.host}:${db.port}/${db.name}`;

const settings = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
};

for (let [key, value] of Object.entries(settings))
	mongoose.set(key, value);

mongoose.connect(db_url)
.then(() => {
	console.log('Connected to mongoDB');
}, e => {
	console.error('Error while DB connecting: ', pe(e));
	throw e;
});


module.exports = {
	User: require("./models/userModel"),
	Post: require("./models/postModel"),
	Comment: require("./models/commentModel"),
	db: mongoose.connection
}
