import { Router } from 'express'
import {
  verifyAccess,
  verifyMediumPermission,
} from '../middlewares/index.js'
import {
  loginUser,
  logoutUser,
  registerUser,
  registerUserByAdmin 
} from '../services/auth.services.js'
import { setCookie } from '../middlewares/setCookie.js'

const router = Router()

router
  .post('/register', registerUser)
  .post('/register-by-admin', [verifyAccess, verifyMediumPermission], registerUserByAdmin)
  .post('/login', loginUser)
  .get('/logout', verifyAccess, logoutUser)
  .use(setCookie)

export default router
