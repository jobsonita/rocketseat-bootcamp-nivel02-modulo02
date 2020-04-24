import { Router } from 'express'

import AuthenticateUserService from '../services/AuthenticateUserService'

const router = Router()

router.post('/', async (req, res) => {
  const { email, password } = req.body

  const authenticateUser = new AuthenticateUserService()

  try {
    const { token } = await authenticateUser.execute({ email, password })

    return res.json({ token })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

export default router
