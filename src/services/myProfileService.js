const User = require('../models/User');

exports.getUserInfo = (userId) => User.findById(userId).populate('wishlist');

exports.updateWishlist = async (userId, watchId) => {
    const user = await User.findById(userId).populate('wishlist');

    const isAlreadyAdded = user.wishlist.some(x => x._id == watchId);

    if (!isAlreadyAdded) {
        user.wishlist.unshift(watchId);
        await user.save();

    } else {
        const indexOfWatch = user.wishlist.findIndex(x => x._id == watchId);
        user.wishlist.splice(indexOfWatch, 1);
        await user.save();
    }
    return user.wishlist;
}

exports.removeFromWishlist = async (userId, watchId) => {
    const user = await User.findById(userId).populate('wishlist');

    const indexOfWatch = user.wishlist.findIndex(x => x._id == watchId);

    if (indexOfWatch !== -1) {
        user.wishlist.splice(indexOfWatch, 1);
        await user.save();
    }

    return user.wishlist;
}