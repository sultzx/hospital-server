import mongoose from "mongoose";

import CallHome from "../model/CallHome.js";

export const call = async (req, res) => {
    try {
        const userId = req.userId

        const {doctorId} = req.body

        const document = new CallHome({
            patient: userId,
            doctor: doctorId
        })

        await document.save()

        res.status(200).json({
            message: 'Сұраныс сәтті жіберілді'
        })

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const allCalls = async (req, res) => {
    try {
        const calls = await CallHome.find().populate('patient').populate('doctor').exec()

        res.status(200).json(calls)

    } catch (error) {
        res.status(500).json(error.message)
    }
}