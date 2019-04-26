const {
  getUserList,
  getUserProfileList,
  getUserProfile,
} = require('./../helpers/user')

const AuthService = require('./../services/auth')

module.exports = {
  Query: {
    users: () => getUserList(),
    currentUser: (parent, args, ctx) => ctx.req.user
  },
  Mutation: {
    createUser: (parent, { email, password }, ctx) => AuthService.signup({ email, password, req: ctx.req }),

    loginUser: (parent, { email, password }, ctx) => AuthService.login({ email, password, req: ctx.req }),

    logoutUser: (parent, args, ctx) => AuthService.logout({ req: ctx.req })
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