const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    image_url: {
        original: String,
        thumbnail: String,
        oversized: String,
    },
    creation_date: Date,
    hashtags: [],
    mentions: [{type: Schema.Types.ObjectId, ref: 'User'}],
    reactions: {
        likes: Number,
        dislikes: Number,
        stars: Number
    },
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

module.exports =  {
    Image: mongoose.model('Image', ImageSchema)
};