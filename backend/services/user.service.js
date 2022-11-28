import User from '../models/User.js'
import argon2 from 'argon2'

export const getUser = async (req, res, next) => {
  const userId = req.user?.user_id

  if (!userId) {
    return res.status(400).json({ message: 'User ID must be provided' })
  }

  try {
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(
      { 
        user_id: user._id, 
        first_name: user.first_name, 
        last_name: user.last_name,
        email: user.email, 
        tel: user.tel,
        position: user.position,
        access_level: user.access_level,
        organisation_id: user.organisation_id,
        dashboard_id: user.dashboard_id,
    })

  } catch (e) {
    console.log('*getUser service')
    next(e)
  }
}

export const updateUser = async (req, res, next) => {
    const userId = req.body?.user_id
    const firstName = req.body?.first_name
    const lastName = req.body?.last_name
    const email = req.body?.email
    const tel = req.body?.tel
    const position = req.body?.position
    const accessLevel = req.body?.access_level

    if (!userId) {
        return res
            .status(400)
            .json({ message: 'User id must be provided' })
    }

    if (!firstName) {
        return res
            .status(400)
            .json({ message: 'First Name must be provided' })
    }

    if (!lastName) {
        return res
            .status(400)
            .json({ message: 'Last Name must be provided' })
    }

    if (!email) {
        return res
            .status(400)
            .json({ message: 'Email must be provided' })
    }

    if (!accessLevel) {
        return res
            .status(400)
            .json({ message: 'Access level must be provided' })
    }

    try {
        let user
        user = await User.findOne({ _id: userId })
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' })
        }
    
        const newData = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          tel: tel ? tel : user.tel,
          position: position ? position : user.position,
          access_level: accessLevel,
        }

        await User.updateOne({_id: userId}, newData)
        user = await User.findOne({ _id: userId })

        res.json(
          { 
            user_id: user.id,
            first_name: user.first_name, 
            last_name: user.last_name,
            email: user.email, 
            tel: user.tel,
            position: user.position,
            access_level: user.access_level,
            organisation_id: user.organisation_id,
            dashboard_id: user.dashboard_id
        })
    
      } catch (e) {
        console.log('updateUser error')
        next(e)
      }
}

export const removeUser = async (req, res, next) => {
    const userId = req.query?.user_id
  
    if (!userId) {
      return res
        .status(400)
        .json({ message: 'User id must be provided' })
    }
  
    try {
      let user = await User.findById(userId)
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
  
      await user.remove()
  
      res
        .status(200)
        .json({ message: `User ${user.email} has been removed` })
    } catch (e) {
      console.log('*removeUser service')
      next(e)
    }
}

export const getAllEmployees = async (req, res, next) => {
  const organisationId = req.query?.organisation_id

  if (!organisationId) {
    return res
        .status(400)
        .json({ message: 'Organisation id must be provided' })
  }

  try {
    let employees = []
    employees = await User.find({ organisation_id: organisationId })
    
    if (!employees) {
      return res.status(404).json({ message: 'Employees not found' })
    }

    let mappedEmployees = []

    employees.forEach((item) => {
      mappedEmployees.push({
          user_id: item._id,
          first_name: item.first_name,
          last_name: item.last_name,
          email: item.email,
          tel: item.tel,
          access_level: item.access_level,
          position: item.position
        }
      )
    })

    res
      .status(200)
      .json(mappedEmployees)

  } catch (e) {
    console.log('*changePassord error')
    next(e)
  }
}

export const getAllExecutors = async(req, res, next) => {
  const organisationId = req.query?.organisation_id

  if (!organisationId) {
    return res
        .status(400)
        .json({ message: 'Organisation id must be provided' })
  }

  try {
    let employees = []
    employees = await User.find({ organisation_id: organisationId })
    
    if (!employees) {
      return res.status(404).json({ message: 'Employees not found' })
    }

    let executors = []

    employees.forEach((item) => {
      executors.push({
          user_id: item._id,
          name: `${item.first_name} ${item.last_name}`
        }
      )
    })

    res
      .status(200)
      .json(executors)

  } catch (e) {
    console.log('*getAllExecutors error')
    next(e)
  }
}

export const changeUserPassowrd = async(req, res, next) => {
  const userId = req.body?.user_id
  const currentPassword = req.body?.current_password
  const newPassowrd = req.body?.new_password

  if (!userId) {
    return res
        .status(400)
        .json({ message: 'User id must be provided' })
  } 

  if (!currentPassword) {
    return res
        .status(400)
        .json({ message: 'Current password must be provided' })
  }

  if (!newPassowrd) {
    return res
        .status(400)
        .json({ message: 'New password must be provided' })
  }

  try {
    let user
    user = await User.findOne({ _id: userId }).select('+password')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isPasswordCorrect = await argon2.verify(user.password, currentPassword)
    if (!isPasswordCorrect) {
      return res.status(403).json({ message: 'Wrong credentials' })
    }

    const hashedPassword = await argon2.hash(newPassowrd)
    await User.updateOne({_id: userId}, {password: hashedPassword})

    res
      .status(200)
      .json({ message: `Password has been changed` })

  } catch (e) {
    console.log('*changePassord error')
    next(e)
  }
}