import express from 'express'
import {upload} from '../middlewares/middlewares.js'
import {addProductController, deleteProductController, getProductController} from '../controllers/product.controller.js'

const router = express.Router()

router.post('/api/add', upload.single('image'), addProductController)
router.delete('/api/delete/:id', deleteProductController)
router.get('/api/fetch', getProductController)

export default router