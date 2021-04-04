const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const PostSchema = new Schema({
    title: String,
    content: String,
    featuredImage: String,
    pubishedOn: { type: Date, default: Date.now },
    createdBy: String,
    comments: [
        {
            userId: String,
            profilePicture: String,
            content: String,
            postedOn: { type: Date, default: Date.now }
        }
    ]
});

module.exports = mongoose.model('Post', PostSchema);