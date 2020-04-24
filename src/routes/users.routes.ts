import { Router } from 'express'

import CreateUserService from '../services/CreateUserService'

const router = Router()

router.post('/', async (req, res) => {
  const { name, email, password } = req.body

  const createUser = new CreateUserService()

  try {
    const user = await createUser.execute({
      name,
      email,
      password,
    })

    delete user.password

    return res.json(user)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

export default router
