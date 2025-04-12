/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { authenticate } from '../middleware/jwtVerify'
import TaskController from '../controller/task'

const routes = Router()

routes.get('/', authenticate, TaskController.getAll);
routes.post('/', authenticate, TaskController.create);
routes.put('/:id', authenticate, TaskController.update)
routes.delete('/:id', authenticate, TaskController.delete)


export default routes
