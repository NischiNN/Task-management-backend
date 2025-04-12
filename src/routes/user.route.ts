/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import UserController from '../controller/user'
import { authenticate } from '../middleware/jwtVerify'

const routes = Router()

routes.post('/login', UserController.login)
routes.post('/signup', UserController.signup)
routes.get('/', authenticate, UserController.getUser)

export default routes
