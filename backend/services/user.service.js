import User from '../models/User.js'

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

    req.user = { 
      user_id: user._id, 
      first_name: user.first_name, 
      last_name: user.last_name,
      email: user.email, 
      tel: user.tel,
      position: user.position,
      access_level: user.access_level,
      organisation: user.organisation,
    }

    next('route')
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

        req.user = { 
          user_id: user.id,
          first_name: user.first_name, 
          last_name: user.last_name,
          email: user.email, 
          tel: user.tel,
          position: user.position,
          access_level: user.access_level,
          organisation: user.organisation
        }
    
        next('route')
      } catch (e) {
        console.log('updateUser error')
        next(e)
      }
}

export const removeUser = async (req, res, next) => {
    const email = req.body?.email
  
    if (!email) {
      return res
        .status(400)
        .json({ message: 'Email must be provided' })
    }
  
    try {
      let user
      if (email.includes('@')) {
        user = await User.findOne({ email: email })
      } 
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
  
      await user.remove()
  
      res
        .status(200)
        .json({ message: `User ${email} has been removed` })
    } catch (e) {
      console.log('*removeUser service')
      next(e)
    }
}

export const getAllEmployees = async (req, res, next) => {
  
}