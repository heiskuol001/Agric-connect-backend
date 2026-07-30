import express from 'express'
import {userRegistrationController, userLoginController }from '../controllers/user.controller.js'

const router = express.Router()


router.post('/api/auth/register', userRegistrationController)
router.post('/api/auth/login', userLoginController)


export default router