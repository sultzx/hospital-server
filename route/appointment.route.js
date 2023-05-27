import express from 'express'

import * as controller from '../controller/appointment.controller.js'
import checkAuth from '../middleware/checkAuth.js'

const appointmentRouter = express.Router()

appointmentRouter.post('/', checkAuth, controller.appointment)

appointmentRouter.get('/', controller.appointments)

appointmentRouter.patch('/', checkAuth, controller.setAppoint)

export default appointmentRouter