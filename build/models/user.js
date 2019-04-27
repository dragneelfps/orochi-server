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
const bycrpt = require('bcrypt');
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    email: String,
    password: { type: String, select: false }
});
UserSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bycrpt.hash(user.password, 10, (err, hashedPassword) => {
        if (err) {
            return next(err);
        }
        user.password = hashedPassword;
        next();
    });
});
UserSchema.methods.comparePasswords = function comparePasswords(candidatePassword, cb) {
    const user = this;
    bycrpt.compare(candidatePassword, user.password, (err, isValid) => {
        cb(err, isValid);
    });
};
module.exports = mongoose.model('user', UserSchema);
