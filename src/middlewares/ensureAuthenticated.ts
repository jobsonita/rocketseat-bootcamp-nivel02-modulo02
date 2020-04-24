import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import authConfig from '../config/auth'

interface TokenPayload {
  sub: string
}

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Header is missing bearer token' })
  }

  const match = authHeader.match(/^Bearer (\S+)$/)

  if (!match) {
    return res.status(401).json({ error: 'Invalid bearer token' })
  }

  const token = match[1]

  try {
    const decoded = verify(token, authConfig.secret) as TokenPayload

    req.user = { id: decoded.sub }

    return next()
  } catch {
    return res.status(401).json({ error: 'Invalid jwt token' })
  }
}
