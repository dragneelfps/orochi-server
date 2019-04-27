const { getUserById } = require('./../../helpers/user');
module.exports = {
    Friend: {
        friend: friend => getUserById(friend.friend),
        friendsSince: friend => 'friend_since'
    }
};
