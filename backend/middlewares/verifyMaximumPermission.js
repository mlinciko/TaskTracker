export const verifyMaximumPermission = async (req, res, next) => {
  const user = req.user

  if (!user) {
    return res.status(403).json({ message: 'User must be provided' })
  }

  if (!user.access_level|| user.access_level !== 'maximum') {
    return res
      .status(403)
      .json({ message: 'Only admins can perform this action' })
  }

  next()
}
