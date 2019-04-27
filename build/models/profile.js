const mongoose = require('mongoose');
const ProfileSchema = mongoose.Schema({
    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    firstName: String,
    middleName: String,
    lastName: String,
    profileImage: String,
    aboutMe: String,
    gender: String,
    friends: [{
            id: mongoose.Schema.Types.ObjectId,
            friend: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            friendSince: Date
        }]
});
module.exports = mongoose.model('profile', ProfileSchema);
