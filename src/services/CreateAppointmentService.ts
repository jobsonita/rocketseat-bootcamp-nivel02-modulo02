import { startOfHour } from 'date-fns'

import Appointment from '../models/Appointment'

import AppointmentsRepository from '../repositories/AppointmentsRepository'

interface Request {
  provider: string
  date: Date
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository
  }

  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date)

    const bookedAppointmentInSameDateExists = this.appointmentsRepository.findByDate(
      appointmentDate
    )

    if (bookedAppointmentInSameDateExists) {
      throw new Error("There's another appointment booked at that time")
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    })

    return appointment
  }
}

export default CreateAppointmentService
