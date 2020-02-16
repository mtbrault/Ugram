const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    userId : {
        type: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        required: true
    },
    imageUrl : {
        type: String,
        trim: true,
        required: true
    },
    hashtags: [{
        type: String,
        trim: true,
    }],
    mentions: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    reactions: {
        likes: {
            type: Number,
            min: 0
        },
        dislikes: {
            type: Number,
            min: 0
        },
        stars: {
           type: Number,
           min: 0
        }
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });