import mongoose from "mongoose";
import Appointment from "../model/Appointment.js";

export const appointment = async (req, res) => {
    try {
        const userId = req.userId
        const {doctorId, day, time} = req.body

        const document = new Appointment({
            patient: userId,
            doctor: doctorId,
            day: day,
            time: time
        })

        await document.save()

        res.status(200).json({
            message: 'Кездесуге жазылу сәтті жүргізілді'
        })

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const setAppoint = async (req, res) => {
    try {
        const {appointmentId} = req.body

        await Appointment.updateOne({
            _id: appointmentId
        }, {
            status: 'success'
        })

        res.status(200).json({
            message: 'Кездесу сәтті белгіленді'
        })

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const appointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('patient').populate('doctor').exec()
        res.status(200).json(appointments)
    } catch (error) {
        res.status(500).json(error.message)
    }
}