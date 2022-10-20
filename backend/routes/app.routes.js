import { Router } from 'express'
import { setCookie } from '../middlewares/setCookie.js'
import authRoutes from './auth.routes.js'
import userRoutes from './user.routes.js'

const router = Router()

router
    .use('/auth', authRoutes)
    .use('/user', userRoutes)
    .use(setCookie)

export default router
