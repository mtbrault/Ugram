const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    name: String,
    email: String,
    phone_number: String,
    creation_date: Date,
    last_update_date: Date,
    profile_picture: String,
});

module.exports = mongoose.model('User', UserSchema);
