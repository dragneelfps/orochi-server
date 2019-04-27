const UserModel = require('./../models/user');
const ProfileModel = require('./../models/profile');
module.exports = {
    getUserByEmail: (email, withPassword) => {
        if (!withPassword)
            return UserModel.findOne({ email });
        return UserModel.findOne({ email }, '+password');
    },
    getUserById: (id) => UserModel.findById(id),
    getUserList: () => UserModel.find({}),
    getUserProfile: (userId) => ProfileModel.findOne({ userId }),
    getUserProfile: (profileId) => ProfileModel.findById(profileId)
};
