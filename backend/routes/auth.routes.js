import { Router } from 'express'
import {
  verifyAccess,
} from '../middlewares/index.js'
import {
  loginUser,
  logoutUser,
  registerUser
} from '../services/auth.services.js'

const router = Router()

router
  .post('/register', registerUser)
  .post('/login', loginUser)
  .get('/logout', verifyAccess, logoutUser)

export default router
