const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./../models/user');
const { getUserByEmail, getUserById } = require('../helpers/user');
passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser((id, done) => {
    getUserById(id)
        .then(user => done(null, user))
        .catch(err => done(err));
});
passport.use(new LocalStrategy({
    usernameField: 'email'
}, (email, password, done) => {
    getUserByEmail(email.toLowerCase(), true)
        .then(user => {
        if (!user) {
            return done(null, false, { message: 'Incorrect Email' });
        }
        user.comparePasswords(password, (err, isValid) => {
            if (err) {
                return done(err);
            }
            if (!isValid) {
                return done(null, false, { message: 'Incorrect Password' });
            }
            return done(null, user);
        });
    })
        .catch(err => done(err));
}));
const signup = ({ email, password, req }) => {
    if (!email || !password) {
        throw new Error('You must provide an email and password.');
    }
    const user = new User({ email, password });
    return getUserByEmail(email)
        .then(existingUser => {
        if (existingUser) {
            throw new Error('Email in use.');
        }
        return user.save();
    })
        .then(user => {
        return new Promise((resolve, reject) => {
            req.logIn(user, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(user);
            });
        });
    });
};
const login = ({ email, password, req }) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('local', (err, user) => {
            if (err) {
                reject(err);
            }
            if (!user) {
                reject('Invalid credentials');
            }
            req.login(user, () => resolve(user));
        })({ body: { email, password } });
    });
};
const logout = ({ req }) => {
    const { user } = req;
    req.logout();
    return user;
};
module.exports = { signup, login, logout };
