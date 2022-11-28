import { Router } from 'express'
import {
    verifyAccess,
    verifyMaximumPermission,
    verifyMediumPermission,
    verifyAuth,
  } from '../middlewares/index.js'
import { getUser, updateUser, removeUser, getAllEmployees, changeUserPassowrd, getAllExecutors } from '../services/user.service.js'

const router = Router()

router
  .get('/', verifyAuth, getUser)
  .put('/update', verifyAccess, updateUser)
  .patch('/change-password', verifyAccess, changeUserPassowrd)
  .delete('/remove', [verifyAccess, verifyMaximumPermission], removeUser)
  .get('/employees', [verifyAccess, verifyMediumPermission], getAllEmployees)
  .get('/executors', getAllExecutors)

export default router