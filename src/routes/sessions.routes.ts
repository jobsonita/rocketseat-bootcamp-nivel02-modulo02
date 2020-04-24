import { Router } from 'express'

import AuthenticateUserService from '../services/AuthenticateUserService'

const router = Router()

router.post('/', async (req, res) => {
  const { email, password } = req.body

  const authenticateUser = new AuthenticateUserService()

  try {
    const { user } = await authenticateUser.execute({ email, password })

    delete user.password

    return res.json({ user })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

export default router
