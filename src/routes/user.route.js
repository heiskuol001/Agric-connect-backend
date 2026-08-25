import express from 'express'
import { userRegistrationController, userLoginController, userLogOutController } from '../controllers/user.controller.js'
import {loginLimiter} from '../middlewares/middlewares.js'

const router = express.Router()


router.post('/api/auth/register', userRegistrationController)
router.post('/api/auth/login', loginLimiter, userLoginController)
router.post('/api/auth/logout', userLogOutController)


export default router