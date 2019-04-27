const Profile = require('./../models/profile');
const createUserProfile = ({ userProfileInput, req }) => {
    if (!req.user) {
        throw new Error('Not authenticated. Please log in first.');
    }
    return Profile.findOne({ userId: req.user._id })
        .then(savedProfile => {
        if (savedProfile) {
            throw new Error('User already has a profile');
        }
        const profile = new Profile(userProfileInput);
        profile.userId = req.user._id;
        return profile.save();
    });
};
module.exports = {
    createUserProfile
};
