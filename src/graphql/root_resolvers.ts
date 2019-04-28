import UserHelper from "./../helpers/user";

import ProfileHelper from "../helpers/profile";

import AuthService from "../services/auth";

import friendResolver from "./resolvers/friend";
import profileResolver from "./resolvers/profile";
import userResolver from "./resolvers/user";

export default {
  Query: {
    users: () => UserHelper.getUserList(),
    currentUser: (parent, args, ctx) => ctx.req.user
  },
  Mutation: {
    createUser: (parent, { email, password }, ctx) => AuthService.signup(email, password, ctx.req),

    loginUser: (parent, { email, password }, ctx) => AuthService.login(email, password, ctx.req),

    logoutUser: (parent, args, ctx) => AuthService.logout(ctx.req),

    createUserProfile: (parent, { userProfileInput }, ctx) =>
      ProfileHelper.createUserProfile({ userProfileInput, req: ctx.req })
  },
  ...userResolver,
  ...profileResolver,
  ...friendResolver
};
