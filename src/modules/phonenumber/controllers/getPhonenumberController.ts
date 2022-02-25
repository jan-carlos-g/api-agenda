import { Request, Response } from 'express'
import { getPhonenumberService } from './../services/getPhonenumberService'

export const getPhonenumberController = async (req:Request,res:Response) => {
	const { id } = req.params
	const result = await getPhonenumberService(id)
	return res.json(result)
}
    