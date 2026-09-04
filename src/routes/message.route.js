import express from 'express'
import { sendMessageController, getMessageController } from '../controllers/message.controller.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()


router.post('/message/send', authMiddleware, sendMessageController)
router.get('/message/:conversationId', authMiddleware, getMessageController)

export default router