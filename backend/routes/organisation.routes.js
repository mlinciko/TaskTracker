import { Router } from 'express'
import { verifyAccess, verifyMaximumPermission, verifyMediumPermission } from '../middlewares/index.js'
import { createOrganisation, updateOrganisationById, getOrganisation } from '../services/organisation.service.js'

const router = Router()

router
    .get('/', [verifyAccess, verifyMediumPermission], getOrganisation)
    .post('/create', [verifyAccess, verifyMaximumPermission], createOrganisation)
    .patch('/update', [verifyAccess, verifyMaximumPermission], updateOrganisationById)

export default router