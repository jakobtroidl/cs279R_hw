const mongoose = require('mongoose');

/**
 * Schema of mongo db database
 * @type {*}
 */
const Users = mongoose.Schema({
    name: { type: String }, // stores username
    email: { type: String}, // stores user email
    password: { type: String}, // stores user password
    todo: { type: Array } // stores user to_do message
}, { versionKey: false });
module.exports.User = mongoose.model('user', Users); // export User model