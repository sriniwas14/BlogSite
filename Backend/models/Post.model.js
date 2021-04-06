const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const PostSchema = new Schema({
    title: String,
    excerpt: String,
    content: String,
    featuredImage: String,
    pubishedOn: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: "user" },
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