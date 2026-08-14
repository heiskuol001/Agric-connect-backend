import express from 'express'
import { userRegistrationController, userLoginController } from '../controllers/user.controller.js'
import {loginLimiter} from '../middlewares/middlewares.js'

const router = express.Router()


router.post('/api/auth/register', userRegistrationController)
router.post('/api/auth/login',loginLimiter, userLoginController)


export default router