import { Types } from "mongoose";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Repository, { IRepository } from "./../data/repository";
import User, { IUser } from "./../models/user";
import AuthError, { AuthErrorType } from "./errors";

export interface IRequest {
  user: IUser;
  logIn: (user: IUser, cb: (err?: Error) => any) => any;
  logout: () => any;
}

const repository: IRepository = new Repository();
const userDao = repository.getUserDao();

passport.serializeUser((user: IUser, done) => {
  done(null, user._id);
});

passport.deserializeUser((id: Types.ObjectId, done) => {
  userDao.getUserById(id)
    .then((user: IUser) => done(null, user))
    .catch((err) => done(err));
});

passport.use(new LocalStrategy({
  usernameField: "email"
}, (email: string, password: string, done) => {
  userDao.getUserByEmail(email.toLowerCase(), true)
    .then((user: IUser) => {
      if (!user) {
        return done(null, false, { message: "Incorrect Email" });
      }
      user.comparePasswords(password, (err, isValid) => {
        if (err) { return done(err); }
        if (!isValid) { return done(null, false, { message: "Incorrect Password" }); }
        return done(null, user);
      });
    })
    .catch((err) => done(err));
}));

const signup = async (email: string, password: string, req: IRequest): Promise<IUser> => {
  if (!email || !password) {
    throw new AuthError(AuthErrorType.FIELD_MISSING);
  }
  const existingUser: IUser = await userDao.getUserByEmail(email);
  if (existingUser) {
    throw new AuthError(AuthErrorType.EMAIL_IN_USE);
  }
  const user = new User({ email, password });
  const savedUser = await user.save();
  return await new Promise((resolve, reject) => {
    req.logIn(savedUser, (err) => {
      if (err) { reject(err); }
      resolve(savedUser);
    });
  });

};

const login = async (email: string, password: string, req: IRequest): Promise<IUser> => {
  return await new Promise((resolve, reject) => {
    passport.authenticate("local", (err, user: IUser) => {
      if (err) {
        reject(err);
        return;
      }
      if (!user) {
        reject(new AuthError(AuthErrorType.INVALID_CREDENTIALS));
        return;
      }
      req.logIn(user, () => resolve(user));
    })({ body: { email, password } });
  });
};

const logout = (req: IRequest) => {
  const { user }: { user: IUser } = req;
  req.logout();
  return user;
};

export default { signup, login, logout };
