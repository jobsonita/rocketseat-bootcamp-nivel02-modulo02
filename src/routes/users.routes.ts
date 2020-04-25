import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '../config/upload'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

import CreateUserService from '../services/CreateUserService'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'

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
    const updateUserAvatar = new UpdateUserAvatarService()

    try {
      const user = await updateUserAvatar.execute({
        user_id: req.user.id,
        avatarFilename: req.file.filename,
      })

      delete user.password

      return res.json(user)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
)

export default router
