import { Router } from 'express'
import authRoutes from './auth.routes.js'
import userRoutes from './user.routes.js'
import orgRoutes from './organisation.routes.js'
import statusRoutes from './status.routes.js'
import taskRoutes from './task.routes.js'

const router = Router()

router
    .use('/auth', authRoutes)
    .use('/user', userRoutes)
    .use('/organisation', orgRoutes)
    .use('/status', statusRoutes)
    .use('/task', taskRoutes)

export default router
