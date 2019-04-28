import UserHelper from "../../helpers/user";

export default {
  User: {
    profile: (user) => UserHelper.getUserProfile(user._id)
  }
};
