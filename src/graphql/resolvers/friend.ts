import { IRepository } from "./../../data/repository";

export default {
  getFriendResolver: (repository: IRepository): any => {
    return {
      Friend: {
        friend: (friend) => repository.getUserDao().getUserById(friend.friend),
        friendsSince: (friend) => "friend_since"
      }
    };
  }
};
