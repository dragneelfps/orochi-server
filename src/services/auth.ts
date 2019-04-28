import { Types } from "mongoose";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Repository, { IRepository } from "./../data/repository";
import User, { IUser } from "./../models/user";

interface IRequest {
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

const signup = (email: string, password: string, req: IRequest) => {
  if (!email || !password) { throw new Error("You must provide an email and password."); }

  const user = new User({ email, password });
  return userDao.getUserByEmail(email)
    .then((existingUser: IUser) => {
      if (existingUser) { throw new Error("Email in use."); }
      return user.save();
    })
    .then((newUser: IUser) => {
      return new Promise((resolve, reject) => {
        req.logIn(newUser, (err) => {
          if (err) { reject(err); }
          resolve(newUser);
        });
      });
    });
};

const login = (email: string, password: string, req: IRequest) => {
  return new Promise((resolve, reject) => {
    passport.authenticate("local", (err, user: IUser) => {
      if (err) { reject(err); }
      if (!user) { reject("Invalid credentials"); }
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
