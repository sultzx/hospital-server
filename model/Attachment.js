import mongoose from "mongoose";

const schema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: 'free'
    }
}, {timestamps: true})

export default mongoose.model('Attachment', schema)

