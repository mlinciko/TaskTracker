import { readFileSync } from 'fs'
import { COOKIE_NAME, VERIFICATION_CODE } from '../config/index.js'
import { verifyToken } from '../utils/token.js'

const PUBLIC_KEY = readFileSync('./config/public_key.pem', 'utf-8')

export const verifyAuth = async (req, res, next) => {
  const verificationCode = req.headers['x-verification-code']

  if (!verificationCode || verificationCode !== VERIFICATION_CODE) {
    return res.status(403).json({ message: 'No verification code' })
  }

  // const refreshToken = req.cookies[COOKIE_NAME]
  const refreshToken = req.headers['x-cookie']

  if (!refreshToken) {
    return res.status(403).json({ message: 'No refresh token' })
  }

  try {
    const decoded = await verifyToken(refreshToken, PUBLIC_KEY)

    if (!decoded) {
      return res.status(403).json({ message: 'Invalid refresh token' })
    }

    req.user = decoded
    next()
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Refresh token has been expired' })
    }

    console.log('*verifyAuth middleware')
    next(e)
  }
}
