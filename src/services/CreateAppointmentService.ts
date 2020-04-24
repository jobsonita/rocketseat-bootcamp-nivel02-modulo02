import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import Appointment from '../models/Appointment'

import AppointmentsRepository from '../repositories/AppointmentsRepository'

interface Request {
  provider: string
  date: Date
}

class CreateAppointmentService {
  public async execute({ provider, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    const appointmentDate = startOfHour(date)

    const bookedAppointmentInSameDateExists = await appointmentsRepository.findByDate(
      appointmentDate
    )

    if (bookedAppointmentInSameDateExists) {
      throw new Error("There's another appointment booked at that time")
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    })

    await appointmentsRepository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService
