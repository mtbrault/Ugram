const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    image_id: {type: Schema.Types.ObjectId, ref: 'Image'},
    creation_date: Date,
    content: String,
    mentions: [{type: Schema.Types.ObjectId, ref: 'User'}],
    reactions: {
        likes: Number,
        dislikes: Number,
        stars: Number
    }
});

module.exports =  {
    Comment: mongoose.model('Comment', CommentSchema)
};