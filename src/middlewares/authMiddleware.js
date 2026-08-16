import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = (authHeader && authHeader.split(" ")[1]);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_TOKEN
        );

        req.user = decoded;

        next();

    } catch (error) {
        console.log("Authentication error:",
            error.message);
        
        return res.status(401).json({
            success: false,
            message: "Invalid or expired tokens"
        });
    }
};

export default authMiddleware;