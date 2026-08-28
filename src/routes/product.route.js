import express from 'express'
import {upload} from '../middlewares/middlewares.js'
import { addProductController, deleteProductController, getProductController,getFarmerProductCount,getNotificationController } from '../controllers/product.controller.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/api/add', upload.single('image'), authMiddleware, addProductController)
router.delete('/api/delete/:id', authMiddleware, deleteProductController)
router.get('/api/fetch', authMiddleware, getProductController)
router.get('/api/product/count', authMiddleware, getFarmerProductCount)
router.get('/api/product/notifications', authMiddleware, getNotificationController)

export default router