import { readFileSync } from 'fs'
import { ACCESS_TOKEN_SECRET, COOKIE_NAME } from '../config/index.js'
import { signToken } from '../utils/token.js'

const PRIVATE_KEY = readFileSync('./config/private_key.pem', 'utf8')

export const setCookie = async (req, res, next) => {
  const user = req.user

  if (!user) {
    return res.status(400).json({ message: 'User must be provided' })
  }

  try {
    const accessToken = await signToken(
      { user_id: user.userId, access_level: user.access_level },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: '5h'
      }
    )

    let refreshToken
    if (!req.cookies[COOKIE_NAME]) {
      refreshToken = await signToken({ user_id: user.user_id }, PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: '7d'
      })

      res.cookie(COOKIE_NAME, refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      })
    }

    if (req.originalUrl.includes('auth')) {
      res.status(200).json({ user, accessToken, refreshToken })
    }
    else res.status(200).json({ user })
  } catch (e) {
    console.log('*setCookie middleware')
    next(e)
  }
}
