const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bookmarks: [
        {
            stocks: { type: String, required: true },
            link: { type: String, required: true },
        },
    ],
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
