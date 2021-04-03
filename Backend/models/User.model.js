const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const UserSchema = new Schema({
    username: String,
    password: String,
    role: String,
    firstName: String,
    lastName: String,
    profilePicture: String
});

module.exports = mongoose.model('User', UserSchema);