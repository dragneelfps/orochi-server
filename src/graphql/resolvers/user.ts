import { IRepository } from "./../../data/repository";

export default {
  getUserResolver: (repository: IRepository): any => {
    return {
      User: {
        profile: (user) =>
          repository.getProfileDao().getUserProfileByUserId(user._id)
      }
    };
  }
};
