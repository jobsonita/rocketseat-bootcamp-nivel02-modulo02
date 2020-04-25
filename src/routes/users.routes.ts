import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '../config/upload'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

import CreateUserService from '../services/CreateUserService'

const upload = multer(uploadConfig)

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

router.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    console.log(req.file)
    return res.json({ ok: true })
  }
)

export default router
