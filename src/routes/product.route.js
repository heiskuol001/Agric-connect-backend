import express from 'express'
import {upload} from '../middlewares/middlewares.js'
import { addProductController, deleteProductController, getProductController } from '../controllers/product.controller.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/api/add', upload.single('image'), authMiddleware, addProductController)
router.delete('/api/delete/:id', authMiddleware, deleteProductController)
router.get('/api/fetch', getProductController)

export default router