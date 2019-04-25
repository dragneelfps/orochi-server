const { getUserList, getUserProfileList, getUserProfile } = require('./../helpers/user')

module.exports = {
  Query: {
    users: () => getUserList()
  },
  User: {
    profiles: user => {
      return getUserProfileList(user._id)
    }
  },
  Profile: {
    // name: profile => {
    //   let name = ''
    //   if (profile.firstName) {
    //     name = profile.firstName
    //   }
    //   if (profile.middleName) {
    //     name = `${name} ${profile.middleName}`
    //   }
    //   if (profile.lastName) {
    //     name = `${name} ${profile.lastName}`
    //   }
    //   return name
    // },
    dob: profile => 'dob',
  },
  Friend: {
    friend: friend => {
      console.log(friend)
      return getUserProfile(friend.friend)
    },
    friendsSince: friend => 'friend_since'
  }
}