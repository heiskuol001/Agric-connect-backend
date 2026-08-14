import multer from "multer"
import rateLimit from "express-rate-limit"

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "upload/")
    },
    filename: (req, res, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
})

const upload = multer({
    storage
})

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        message: "Too many login attempts, try again later"
    }
});

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, 
    message: {
        success: false,
        message: "Too many requests, please try again later"
    }
});

export {upload, loginLimiter, generalLimiter}