import mongoose from "mongoose";

const schema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    day: String,
    time: String,
    status: {
        type: String,
        default: 'waiting'
    }
}, {
    timestamps: true
})

export default mongoose.model('Appointment', schema)