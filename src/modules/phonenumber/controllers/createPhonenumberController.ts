import { Request, Response } from 'express'
import { createPhonenumberService } from './../services/createPhonenumberService'

export const createPhonenumberController = async (req: Request, res: Response) => {
	const data = req.body
	const result = await createPhonenumberService(data)
	return res.json(result)
}
