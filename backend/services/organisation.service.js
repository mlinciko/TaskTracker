import Organisation from '../models/Organisation.js'
import User from '../models/User.js'

export const getOrganisation = async (req, res, next) => {
    const organisationId = req.query?.organisation_id

    if (!organisationId) {
        return res
        .status(400)
        .json({ message: 'Organisation Id must be provided' })
    }

    try {
        const organisation = await Organisation.findById(organisationId)

        if (!organisation) {
        return res.status(404).json({ message: 'Organisation not found' })
        }
        
        res.json({ 
            name: organisation.name,
            inn: organisation.inn,
            address: organisation.address,
            description: organisation.description
        })

    } catch (e) {
        console.log('*updateOrg service')
        next(e)
    }
}

export const createOrganisation = async (req, res, next) => {
    const organisation = req.body?.organisation
    const userId = req.body?.user_id

    if (!organisation.name) {
        return res
        .status(400)
        .json({ message: 'Organisation name must be provided' })
    }

    if (!organisation.address) {
        return res
        .status(400)
        .json({ message: 'Organisation address must be provided' })
    }
    try {
        const user = await User.findById(userId)

        if (!user) {
          return res.status(404).json({ message: 'User not found' })
        }

        if (user.organisation_id) {
            return res.status(404).json({ message: 'User already has an organisation' })
        }

        const newOrg = await Organisation.create({
            name: organisation.name,
            inn: organisation.inn ? organisation.inn : null,
            address: organisation.address,
            description: organisation.description ? organisation.description : null,
        })

        await User.updateOne({_id: userId}, {organisation_id: newOrg.id})
        
        res.json({ 
            organisation_id: newOrg.id,
            name: newOrg.name,
            inn: newOrg.inn,
            address: newOrg.address,
            description: newOrg.description
        })

    } catch (e) {
        console.log('*createOrg service')
        next(e)
    }
}

export const updateOrganisationById = async (req, res, next) => {
    const organisationId = req.body?.organisation_id
    const name = req.body?.name
    const inn = req.body?.inn
    const address = req.body?.address
    const description = req.body?.description


    if (!name) {
        return res
        .status(400)
        .json({ message: 'Organisation name must be provided' })
    }

    if (!address) {
        return res
        .status(400)
        .json({ message: 'Organisation address must be provided' })
    }

    if (!organisationId) {
        return res
        .status(400)
        .json({ message: 'Organisation Id must be provided' })
    }

    try {
        const org = await Organisation.findById(organisationId)

        if (!org) {
        return res.status(404).json({ message: 'Organisation not found' })
        }

        let organisation = {
            name: name ? name : org.name,
            inn: inn ? inn : org.inn,
            address: address ? address : org.address,
            description: description ? description : org.description
        }

        await Organisation.updateOne({_id: organisationId}, organisation)
        
        res.json({ 
            organisation_id: organisationId,
            name: name,
            inn: inn,
            address: address,
            description: description
        })

    } catch (e) {
        console.log('*updateOrg service')
        next(e)
    }
}
