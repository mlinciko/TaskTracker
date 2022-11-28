import { Router } from 'express'
import { getAllStatuses } from '../services/status.service.js'

const router = Router()

router
    .get('/', getAllStatuses)

export default router