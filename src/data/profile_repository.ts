import mongoose from "mongoose";
import ProfileModel, { IProfile } from "./../models/profile";

export interface IProfileDao {
  getUserProfileByUserId(userId: mongoose.Types.ObjectId): Promise<IProfile>;
  getUserProfileById(profileId: mongoose.Types.ObjectId): Promise<IProfile>;
  createUserProfile(userProfileInput: any, req: any): Promise<IProfile>;
}

export default class ProfileRepository implements IProfileDao {
  public getUserProfileByUserId(userId: mongoose.Types.ObjectId): Promise<IProfile> {
    return ProfileModel.findOne({ userId }).exec();
  }
  public getUserProfileById(profileId: mongoose.Types.ObjectId): Promise<IProfile> {
    return ProfileModel.findById(profileId).exec();
  }
  public createUserProfile(userProfileInput: any, req: any): Promise<IProfile> {
    if (!req.user) { throw new Error("Not authenticated. Please log in first."); }
    return ProfileModel.findOne({ userId: req.user._id })
      .then((savedProfile: IProfile) => {
        if (savedProfile) { throw new Error("User already has a profile"); }
        const profile = new ProfileModel(userProfileInput);
        profile.userId = req.user._id;
        return profile.save();
      });
  }

}
