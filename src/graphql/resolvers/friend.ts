import UserHelper from "./../../helpers/user";

export default {
  Friend: {
    friend: (friend) => UserHelper.getUserById(friend.friend),
    friendsSince: (friend) => "friend_since"
  }
};
