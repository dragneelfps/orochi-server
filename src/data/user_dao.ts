import mongoose from "mongoose";
import { IUser } from "./../models/user";

export default interface IUserDao {
  getUserByEmail(email: string, withPassword?: boolean): Promise<IUser>;
  getUserById(id: mongoose.Types.ObjectId): Promise<IUser>;
  getUserList(): Promise<IUser[]>;
}
