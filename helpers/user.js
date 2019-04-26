const UserModel = require('./../models/user')
const ProfileModel = require('./../models/profile')

module.exports = {

  getUserByEmail: async (email) => UserModel.findOne({ email }),

  getUserById: (id) => UserModel.findById(id),

  getUserList: () => UserModel.find({}),

  getUserProfile: (userId) =>
    ProfileModel.findOne({ userId }),

  getUserProfile: (profileId) => ProfileModel.findById(profileId)

}