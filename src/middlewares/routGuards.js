exports.isAdmin = async (req, res, next) => {

    if (!req.user?.isAdmin) {
        res.status(403).json({ message: 'Няма достъп!' });
    }
    next();
}