import mongoose from "mongoose";
import ProfileModel from "./../models/profile";
import UserModel, { IUser } from "./../models/user";

export default {

  getUserByEmail: (email: string, withPassword?: boolean) => {
    if (!withPassword) { return UserModel.findOne({ email }); }
    return UserModel.findOne({ email }, "+password");
  },

  getUserById: (id: mongoose.Types.ObjectId) => UserModel.findById(id),

  getUserList: () => UserModel.find({}),

  getUserProfile: (userId: mongoose.Types.ObjectId) =>
    ProfileModel.findOne({ userId }),

  getUserProfileById: (profileId: mongoose.Types.ObjectId) =>
    ProfileModel.findById(profileId)

};
