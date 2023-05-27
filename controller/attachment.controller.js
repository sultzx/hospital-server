import mongoose from "mongoose";
import Attachment from "../model/Attachment.js";
import User from '../model/User.js'

export const attachment = async (req, res) => {
    try {
        
        const userId = req.userId

        const user = await User.findById(userId)

        if (user.role != 'patient') {
            return res.json({
                message: 'Емханаға тіркеле алу үшін жүйеге пациент ретінде кіру керексіз!'
            })
        }

        const isAttached = await Attachment.findOne({
            patient: userId
        })

        if (isAttached) {
            return res.status(409).json({
                message: 'Өтініш жіберілген!'
            })
        }

        const document = new Attachment({
            patient: userId
        })

        await document.save()

        res.status(200).json({
            message: 'Емханаға тіркелуге өтініш сәтті жіберілді'
        })

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const allAttachments = async (req, res) => {
    try {
        const attachments = await Attachment.find().populate('patient').exec()
        // .where('status').equals('attached')
        res.status(200).json(attachments)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const attachSetStatus = async (req, res) => {
    try {

        const {attachmentId} = req.body

        await Attachment.updateOne({
            _id: attachmentId
        }, {
            status: 'attached'
        })

        res.status(200).json({
            message: 'Пациент емханаға сәтті тіркелді'
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}