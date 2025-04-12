/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import UserRouter from './user.route'
import TaskRouter from './task.route'

const routes = Router()

routes.use('/user', UserRouter)
routes.use('/task', TaskRouter)

export default routes
