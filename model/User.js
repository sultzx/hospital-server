import mongoose from "mongoose";

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    pass: String,
    role: String,
    personal: {
        type: Object,
        fullname: String,
        phone: String,
        birthday: Date,
        address: String,
    },
    specialization: String,
    working_hours: {
        type: Object,
        begin: String,
        end: String
    },
    medical: {
        type: Object,
        height: Number,
        weight: Number,
    },
    laboratory: {
        type: Object,
        Biochemistry: {
            type: Object,
            name: 'Биохимия',
            result: String
        },
        Diagnostics: {
            type: Object,
            name: 'Диагностика',
            result: String
        },
        Immunology: {
            type: Object,
            name: 'Иммунология',
            result: String
        },
        Parasitology: {
            type: Object,
            name: 'Паразитология',
            result: String
        },
        Chromatography: {
            type: Object,
            name: 'Хроматография',
            result: String
        },
        Hematology: {
            type: Object,
            name: 'Гематология',
            result: String
        },
        Hormones: {
            type: Object,
            name: 'Гормондар',
            result: String
        },
        Allergens: {
            type: Object,
            name: 'Аллергендер',
            result: String
        },
        Genetics: {
            type: Object,
            name: 'Генетика',
            result: String
        },
    },
    avatarUrl: String
}, {timestamps: true})

export default mongoose.model('User', schema)