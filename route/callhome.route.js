import express from 'express'

import * as controller from '../controller/callhome.controller.js'
import checkAuth from '../middleware/checkAuth.js'

const callhomeRouter = express.Router()

callhomeRouter.post('/', checkAuth, controller.call)

callhomeRouter.get('/', controller.allCalls)

export default callhomeRouter