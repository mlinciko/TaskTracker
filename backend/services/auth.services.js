import argon2 from 'argon2'
import { COOKIE_NAME } from '../config/index.js'
import User from '../models/User.js'
import Organisation from '../models/Organisation.js'

export const registerUser = async (req, res, next) => {
  const firstName = req.body?.first_name
  const lastName = req.body?.last_name
  const email = req.body?.email
  const tel = req.body?.tel
  const password = req.body?.password
  const accessLevel = req.body?.access_level ? req.body?.access_level : "maximum"


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

  if (!password) {
    return res
      .status(400)
      .json({ message: 'Password must be provided' })
  }

  if (!tel) {
    return res
      .status(400)
      .json({ message: 'Mobile number must be provided' })
  }

  try {
    const [existingUserByEmail] = await User.find({email})

    if (existingUserByEmail) {
      return res
        .status(409)
        .json({ message: 'Email already in use' })
    }

    const [existingUserByTel] = await User.find({tel})

    if (existingUserByTel) {
      return res
        .status(409)
        .json({ message: 'Telephone number already in use' })
    }

    const hashedPassword = await argon2.hash(password)

    const newUser = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: email,
      tel: tel,
      password: hashedPassword,
      access_level: accessLevel,
    })

    req.user = { 
      user_id: newUser.id,
      first_name: firstName, 
      last_name: lastName,
      email: email, 
      tel: tel,
      position: newUser.position,
      access_level: newUser.access_level,
      organisation_id: newUser.organisation_id
    }

    next('route')
  } catch (e) {
    console.log('*registerUser service')
    next(e)
  }
}

export const registerUserByAdmin = async (req, res, next) => {
  const firstName = req.body?.first_name
  const lastName = req.body?.last_name
  const email = req.body?.email
  const tel = req.body?.tel
  const password = req.body?.password
  const accessLevel = req.body?.access_level ? req.body?.access_level : "default"
  const organisationId = req.body?.organisation_id
  const position = req.body?.position


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

  if (!password) {
    return res
      .status(400)
      .json({ message: 'Password must be provided' })
  }

  if (!organisationId) {
    return res
      .status(400)
      .json({ message: 'Organisation Id must be provided' })
  }

  if (!position) {
    return res
      .status(400)
      .json({ message: 'Position must be provided' })
  }

  if (!tel) {
    return res
      .status(400)
      .json({ message: 'Mobile number must be provided' })
  }

  try {
    const [existingUserByEmail] = await User.find({email})
    if (existingUserByEmail) {
      return res
        .status(409)
        .json({ message: 'Email is already in use' })
    }

    const [existingUserByTel] = await User.find({tel})
    if (existingUserByTel) {
      return res
        .status(409)
        .json({ message: 'Telephone number is already in use' })
    }
    
    const userOrg = await Organisation.findById(organisationId)
    if (!userOrg) {
      return res
        .status(404)
        .json({ message: 'Organisation not found' })
    }

    const hashedPassword = await argon2.hash(password)

    const newUser = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: email,
      tel: tel,
      password: hashedPassword,
      access_level: accessLevel,
      organisation_id: organisationId,
      position: position,
    })
  

    req.user = { 
      user_id: newUser.id,
      first_name: newUser.firstName, 
      last_name: newUser.lastName,
      email: newUser.email, 
      tel: newUser.tel,
      position: newUser.position,
      access_level: newUser.access_level,
      organisation_id: newUser.organisation_id,
    }

    next('route')
  } catch (e) {
    console.log('*registerUser service')
    next(e)
  }
}

export const loginUser = async (req, res, next) => {
  const email = req.body?.email
  const password = req.body?.password

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Email and password must be provided' })
  }

  try {
    let user
    if (email.includes('@')) {
      user = await User.findOne({ email: email }).select('+password')
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isPasswordCorrect = await argon2.verify(user.password, password)

    if (!isPasswordCorrect) {
      return res.status(403).json({ message: 'Wrong credentials' })
    }

    req.user = { 
      user_id: user.id, 
      first_name: user.first_name, 
      last_name: user.last_name,
      email: user.email, 
      tel: user.tel,
      position: user.position,
      access_level: user.access_level,
      organisation_id: user.organisation_id,
    }

    next('route')
  } catch (e) {
    console.log('*loginUser service')
    next(e)
  }
}

export const logoutUser = (req, res, next) => {
  res.clearCookie(COOKIE_NAME)
  res.status(200).json({ message: 'User has been logout' })
}
