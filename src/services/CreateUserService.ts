import { getRepository } from 'typeorm'

import User from '../models/User'

interface Request {
  name: string
  email: string
  password: string
}

export default class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User)

    const userWithSameEmailExists = await usersRepository.findOne({
      where: { email },
    })

    if (userWithSameEmailExists) {
      throw new Error("There's another user registered with that e-mail")
    }

    const user = usersRepository.create({
      name,
      email,
      password,
    })

    await usersRepository.save(user)

    return user
  }
}
