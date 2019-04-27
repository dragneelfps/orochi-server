const {
  getUserList
} = require('../helpers/user')

const ProfileDao = require('../helpers/profile')

const AuthService = require('../services/auth')

const userResolver = require('./resolvers/user')
const profileResolver = require('./resolvers/profile')
const friendResolver = require('./resolvers/friend')

module.exports = {
  Query: {
    users: () => getUserList(),
    currentUser: (parent, args, ctx) => ctx.req.user
  },
  Mutation: {
    createUser: (parent, { email, password }, ctx) => AuthService.signup({ email, password, req: ctx.req }),

    loginUser: (parent, { email, password }, ctx) => AuthService.login({ email, password, req: ctx.req }),

    logoutUser: (parent, args, ctx) => AuthService.logout({ req: ctx.req }),

    createUserProfile: (parent, { userProfileInput }, ctx) => ProfileDao.createUserProfile({ userProfileInput, req: ctx.req })
  },
  ...userResolver,
  ...profileResolver,
  ...friendResolver
}