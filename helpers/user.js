const mongoose = require('mongoose')
const passport = require('passport')

const UserModel = require('./../models/user')
const ProfileModel = require('./../models/profile')

module.exports = {

  getUserByEmail: async (email) => UserModel.findOne({ email }),

  getUserById: (id) => UserModel.findById(id),

  getUserList: () => UserModel.find({}),

  getUserProfileList: (userId) =>
    ProfileModel.find({})
      .then(profiles => profiles.filter(profile => profile.userId.equals(userId))),

  getUserProfile: (profileId) => ProfileModel.findById(profileId)

}