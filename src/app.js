import express from 'express'
import cors from 'cors'
import userRoutes from '../src/routes/user.route.js'
import productRoutes from '../src/routes/product.route.js'
import { generalLimiter } from '../src/middlewares/middlewares.js'
import redisClient from './config/redis.js'
import helmet from 'helmet'
import cookieParser from "cookie-parser"

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(generalLimiter)
app.use(cookieParser())
app.use('/user', userRoutes)
app.use('/product', productRoutes)


export default app