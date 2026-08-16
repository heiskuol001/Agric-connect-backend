import express from 'express'
import cors from 'cors'
import userRoutes from '../src/routes/user.route.js'
import productRoutes from '../src/routes/product.route.js'
import { generalLimiter } from '../src/middlewares/middlewares.js'
import redisClient from './config/redis.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(generalLimiter)

app.use('/user', userRoutes)
app.use('/product', productRoutes)


export default app