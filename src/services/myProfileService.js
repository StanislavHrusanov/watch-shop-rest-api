const User = require('../models/User');

exports.getUserInfo = (userId) => User.findById(userId).populate('wishlist').populate('cart.watch');

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

exports.addToCart = async (userId, watchId, qty) => {
    const user = await User.findById(userId).populate('cart.watch');

    const isAlreadyAdded = user.cart.some(x => x.watch._id == watchId);

    if (!isAlreadyAdded) {
        user.cart.unshift({ watch: watchId, qty: qty })
        await user.save();
    } else {
        const indexOfWatch = user.cart.findIndex(x => x.watch._id == watchId);
        user.cart[indexOfWatch].qty = qty;
        await user.save();

    }

    const updatedUser = await User.findById(userId).populate('cart.watch');

    return updatedUser.cart;
}

exports.removeFromCart = async (userId, watchId) => {
    const user = await User.findById(userId).populate('cart.watch');

    const indexOfWatch = user.cart.findIndex(x => x.watch._id == watchId);

    if (indexOfWatch != -1) {
        user.cart.splice(indexOfWatch, 1);
        await user.save();
    }

    return user.cart;
}

exports.decreaseQty = async (userId, watchId, qty) => {
    const user = await User.findById(userId).populate('cart.watch');

    const indexOfWatch = user.cart.findIndex(x => x.watch._id == watchId);
    user.cart[indexOfWatch].qty = qty;
    await user.save();

    const updatedUser = await User.findById(userId).populate('cart.watch');

    return updatedUser.cart;
}

exports.updateUserCart = async (userId) => {
    const user = await this.getUserInfo(userId);

    for (let i = 0; i < user.cart.length; i++) {
        let currentWatch = user.cart[i];

        if (currentWatch.watch.quantity < currentWatch.qty) {
            currentWatch.qty = currentWatch.watch.quantity;
        }
    }

    await user.save();

    return user;
}

exports.cleanCart = async (userId) => {
    const user = await this.getUserInfo(userId);

    user.cart = [];

    await user.save();

    return user;
}