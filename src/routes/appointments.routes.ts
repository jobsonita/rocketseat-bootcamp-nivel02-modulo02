import { parseISO } from 'date-fns'
import { Router } from 'express'
import { getCustomRepository } from 'typeorm'

import AppointmentsRepository from '../repositories/AppointmentsRepository'

import CreateAppointmentService from '../services/CreateAppointmentService'

const router = Router()

router.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)

  const appointments = await appointmentsRepository.find()

  return res.json(appointments)
})

router.post('/', async (req, res) => {
  const { provider, date } = req.body

  const parsedDate = parseISO(date)

  const createAppointment = new CreateAppointmentService()

  try {
    const appointment = await createAppointment.execute({
      provider,
      date: parsedDate,
    })

    return res.json(appointment)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

export default router
