const mongoose = require("mongoose");
const pe = require("parse-error");

const { db } = require('./config');
const db_url = `${db.dialect}://${db.host}:${db.port}/${db.name}`;

mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
	console.log('Connected to mongoDB');
}, e => {
	console.error('Error while DB connecting: ', pe(e));
	throw e;
});
mongoose.set('useCreateIndex', true);


module.exports = {
	User: require("./models/userModel"),
	db: mongoose.connection
}
