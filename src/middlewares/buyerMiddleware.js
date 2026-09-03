
const onlyBuyerMiddleware = (req, res, next) => {
    if (req.user.role !== 'buyer') {
        return res.status(403).json({
            success: false,
            message: "Access denied. Only buyers are allowed."
        });
    }
    next();
}

export default onlyBuyerMiddleware;