import { Router } from 'express'
import { getTasks, createTask, getTaskById, updateTask } from '../services/task.service.js'

const router = Router()

router
    .get('/', getTaskById)
    .post('/', createTask)
    .patch('/', updateTask)
    .get('/all', getTasks)
    

export default router