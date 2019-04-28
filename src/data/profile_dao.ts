import mongoose from "mongoose";
import { IProfile } from "./../models/profile";

export default interface IProfileDao {
  getUserProfileByUserId(userId: mongoose.Types.ObjectId): Promise<IProfile>;
  getUserProfileById(profileId: mongoose.Types.ObjectId): Promise<IProfile>;
  createUserProfile(userProfileInput: any, req: any): Promise<IProfile>;
}
