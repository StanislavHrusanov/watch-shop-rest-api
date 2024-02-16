const User = require('../models/User');

exports.getUserInfo = (userId) => User.findById(userId);

exports.updateWishlist = async (userId, watchId) => {
    const user = await User.findById(userId);

    const isAlreadyAdded = user.wishlist.find(x => x == watchId);

    if (!isAlreadyAdded) {
        user.wishlist.push(watchId);
        await user.save();

    } else {
        const indexOfWatch = user.wishlist.indexOf(x => x == watchId);
        user.wishlist.splice(indexOfWatch, 1);
        await user.save();
    }
    return user.wishlist;
}