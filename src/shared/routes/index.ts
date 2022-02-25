import { Router } from 'express'
import { phonenumber_router } from '../../modules/phonenumber/routes/phonenumber.routes'

const routes = Router()

routes.use('/phonebook', phonenumber_router)

export { routes }