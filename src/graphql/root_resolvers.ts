import AuthService from "../services/auth";

import { IRepository } from "./../data/repository";
import friendResolver from "./resolvers/friend";
import profileResolver from "./resolvers/profile";
import userResolver from "./resolvers/user";

import { ApolloError, UserInputError } from "apollo-server-errors";

export default {
  getRootResolver: (repository: IRepository): any => {
    const userDao = repository.getUserDao();
    const profileDao = repository.getProfileDao();
    return {
      Query: {
        users: () => userDao.getUserList(),
        currentUser: (parent, args, ctx) => ctx.req.user
      },
      Mutation: {
        createUser: async (parent, { email, password }, ctx) => {
          try {
            const user = await AuthService.signup(email, password, ctx.req);
            return user;
          } catch (e) {
            throw new UserInputError(e.message);
          }
        },

        loginUser: async (parent, { email, password }, ctx) => {
          try {
            const user = await AuthService.login(email, password, ctx.req);
            return user;
          } catch (e) {
            throw new UserInputError(e.message);
          }
        },

        logoutUser: (parent, args, ctx) => AuthService.logout(ctx.req),

        createUserProfile: (parent, { userProfileInput }, ctx) =>
          profileDao.createUserProfile(userProfileInput, ctx.req)
      },
      ...(userResolver.getUserResolver(repository)),
      ...(profileResolver.getProfileRepository()),
      ...(friendResolver.getFriendResolver(repository))
    };
  }
};
