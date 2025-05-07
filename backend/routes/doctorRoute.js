import express from 'express'
import { doctorList, bookAppointment } from '../controllers/doctorController.js'

const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/book', bookAppointment)

export default doctorRouter
