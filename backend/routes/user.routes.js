import { Router } from 'express'
import {
    verifyAccess,
    verifyPermission,
    verifyAuth,
  } from '../middlewares/index.js'
import { getUser, updateUser, removeUser } from '../services/user.service.js'

const router = Router()

router
  .get('/', verifyAuth, getUser)
  .put('/update', verifyAccess, updateUser)
  .delete('/remove', [verifyAccess, verifyPermission], removeUser)
  .get("/employess", verifyAccess, getAllEmployees)

export default router