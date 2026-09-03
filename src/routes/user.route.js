import express from 'express'
import { userRegistrationController, userLoginController, userLogOutController,getCurrentUser } from '../controllers/user.controller.js'
import { loginLimiter } from '../middlewares/middlewares.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()


router.post('/api/auth/register', userRegistrationController)
router.post('/api/auth/login', userLoginController)
router.post('/api/auth/logout', userLogOutController)
router.get("/api/auth/me", authMiddleware, getCurrentUser)


export default router