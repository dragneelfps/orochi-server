// const axios = require('axios')

// class User {
//   constructor() {
//     this.api = axios.create({
//       baseURL: 'http://localhost:5000'
//     })
//   }
//   list() {
//     return this.api.get('/users').then(res => res.data)
//   }
//   profiles(id) {
//     return this.api.get(`/users/${id}/profiles`).then(res => {
//       const data = res.data
//       console.log(data)
//       return data
//     })
//   }
// }

// module.exports = new User()

import bycrpt from "bcrypt";
import { Document, model, Model, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  comparePasswords: (candidatePassword: string,
                     cb: (err: Error, isValid: boolean) => any) => any;
}

export const UserSchema: Schema = new Schema({
  email: String,
  password: { type: String, select: false }
});

UserSchema.pre<IUser>("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) { return next(); }
  bycrpt.hash(user.password, 10, (err, hashedPassword) => {
    if (err) { return next(err); }
    user.password = hashedPassword;
    next();
  });
});

UserSchema.methods.comparePasswords =
  function comparePasswords(candidatePassword: string,
                            cb: (err: Error, isValid: boolean) => any) {

    const user: IUser = this;
    bycrpt.compare(candidatePassword, user.password, (err, isValid) => {
      cb(err, isValid);
    });

  };
export default model<IUser>("user", UserSchema);
