const mongoose = require('mongoose')

const UserModel = mongoose.model('user')
const ProfileModel = mongoose.model('profile')

module.exports = {

  getUserList: () => UserModel.find({}),

  getUserProfileList: (userId) =>
    ProfileModel.find({})
      .then(profiles => profiles.filter(profile => profile.userId.equals(userId))),

  getUserProfile: (profileId) => ProfileModel.findById(profileId)

}