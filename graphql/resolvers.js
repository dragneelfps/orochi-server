const userModel = require('./../models/user')

module.exports = {
  Query: {
    users: () => userModel.list()
  },
  User: {
    profiles: user => userModel.profiles(user.id)
  },
  Profile: {
    name: profile => {
      let name = ''
      if (profile.firstName) {
        name = profile.firstName
      }
      if (profile.middleName) {
        name = `${name} ${profile.middleName}`
      }
      if (profile.lastName) {
        name = `${name} ${profile.lastName}`
      }
      return name
    }
  }
}