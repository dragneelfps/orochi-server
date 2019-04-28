import mongoose from "mongoose";
import UserModel, { IUser } from "./../models/user";
import IUserDao from "./user_dao";

export default class UserRepository implements IUserDao {
  public getUserByEmail(email: string, withPassword?: boolean): Promise<IUser> {
    if (!withPassword) {
      return UserModel.findOne({ email }).exec();
    }
    return UserModel.findOne({ email }, "+password").exec();
  }
  public getUserById(id: mongoose.Types.ObjectId): Promise<IUser> {
    return UserModel.findById(id).exec();
  }
  public getUserList(): Promise<IUser[]> {
    return UserModel.find({}).exec();
  }
}
