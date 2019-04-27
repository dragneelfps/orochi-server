const {
  getUserProfile
} = require('../../helpers/user')

module.exports = {
  User: {
    profile: user => {
      return getUserProfile(user._id)
    }
  }
}