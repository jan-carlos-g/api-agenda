import { Router } from 'express'
import { createPhonenumberController } from '../controllers/createPhonenumberController';
import { getPhonenumberController } from '../controllers/getPhonenumberController';
import { getAllPhonenumberController } from '../controllers/getAllPhonenumberController';
import { updatePhonenumberController } from '../controllers/updatePhonenumberController';
import { deletePhonenumberController } from '../controllers/deletePhonenumberController';

const phonenumber_router = Router()

phonenumber_router.post('/', createPhonenumberController)
phonenumber_router.get('/', getAllPhonenumberController)
phonenumber_router.get('/:id', getPhonenumberController)
phonenumber_router.put('/:id', updatePhonenumberController)
phonenumber_router.delete('/:id', deletePhonenumberController)

export { phonenumber_router }
