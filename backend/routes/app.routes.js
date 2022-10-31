import { Router } from 'express'
import authRoutes from './auth.routes.js'
import userRoutes from './user.routes.js'
import orgRoutes from './organisation.routes.js'

const router = Router()

router
    .use('/auth', authRoutes)
    .use('/user', userRoutes)
    .use('/organisation', orgRoutes)

export default router
