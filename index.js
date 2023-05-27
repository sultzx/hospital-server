import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import cors from 'cors'
import userRouter from './route/user.route.js'
import attachmentRouter from './route/attachment.route.js'
import callhomeRouter from './route/callhome.route.js'
// import userRouter from './route/user.routes.js'
import uploadRouter from './route/upload.route.js'
import appointmentRouter from './route/appointment.route.js'

const app = express()

const PORT = config.get('port.1') || config.get('port.2')

app.use(express.json())

app.use('/uploads', express.static('uploads'))
app.use('/images', express.static('images'))

app.use(cors())


const start = async () => {
    try {
        await mongoose.set('strictQuery', true)
        await mongoose.connect(config.get('mongodb.url'))
        console.log(`database OK\tname: ${mongoose.connection.name}`)
    } catch (error) {
        console.log(`database ERROR\tcodename: ${error.message}`)
    }

    app.use('/api/callhome', callhomeRouter)
    app.use('/api/attachment', attachmentRouter)
    app.use('/api/appointment', appointmentRouter)
    app.use('/api/upload', uploadRouter)
    app.use('/api/user', userRouter)

    app.listen(PORT, (error) => {
        if(error) {
            console.log(`server ERROR`)
        }
        console.log(`server OK\tport: ${PORT}`)
    })
}

start()