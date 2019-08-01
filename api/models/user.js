const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, require: true},
    password: {type: String, required: true}
});

const User = mongoose.model('User', userSchema);
module.exports = User;

