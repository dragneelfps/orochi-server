import mongoose, { Document } from "mongoose";

export interface IProfile extends Document {
  username: string;
  userId: mongoose.Types.ObjectId;
  firstName: string;
  middleName: string;
  lastName: string;
  profileImage: string;
  aboutMe: string;
  gender: string;
  friends: IFriend[];
}

export interface IFriend extends Document {
  id: mongoose.Types.ObjectId;
  friend: mongoose.Types.ObjectId;
  friendSince: Date;
}

const ProfileSchema = new mongoose.Schema({
  username: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  firstName: String,
  middleName: String,
  lastName: String,
  profileImage: String,
  aboutMe: String,
  gender: String,
  friends: [{
    id: mongoose.Schema.Types.ObjectId,
    friend: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    friendSince: Date
  }]
});

export default mongoose.model<IProfile>("profile", ProfileSchema);
