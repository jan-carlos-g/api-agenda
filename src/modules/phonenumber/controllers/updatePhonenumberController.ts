import { Request, Response } from 'express'
import { updatePhonenumberService } from './../services/updatePhonenumberService'

export const updatePhonenumberController = async (req: Request, res: Response) => {
	const { id } = req.params
	const data = req.body
	const result = await updatePhonenumberService(id, data)
	return res.json(result)
}
