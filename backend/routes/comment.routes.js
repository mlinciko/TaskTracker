import { Router } from 'express'
import { getCommentById, createComment, updateComment, deleteComment, getCommentsByTask } from '../services/comment.service.js'

const router = Router()

router
    .get('/', getCommentById)
    .post('/', createComment)
    .patch('/', updateComment)
    .delete('/', deleteComment)
    .get('/task', getCommentsByTask)
    

export default router