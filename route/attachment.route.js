import express from 'express'

import * as controller from '../controller/attachment.controller.js'
import checkAuth from '../middleware/checkAuth.js'

const attachmentRouter = express.Router()

attachmentRouter.post('/', checkAuth, controller.attachment)

attachmentRouter.get('/', controller.allAttachments)

attachmentRouter.patch('/', checkAuth, controller.attachSetStatus)

export default attachmentRouter