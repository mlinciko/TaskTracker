export const verifyMediumPermission = async (req, res, next) => {
    const user = req.user
  
    if (!user) {
      return res.status(403).json({ message: 'User must be provided' })
    }
  
    if (!user.access_level || (user.access_level !== 'maximum' && user.access_level !== 'medium')) {
      return res
        .status(403)
        .json({ message: 'Only medium or maximum users can perform this action' })
    }
  
    next()
  }
  