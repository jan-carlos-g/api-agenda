import { Request, Response } from 'express'
import { getAllPhonenumberService } from './../services/getAllPhonenumberService'

export const getAllPhonenumberController = async (req:Request,res:Response) => {
	const result = await getAllPhonenumberService()
	return res.json(result)
}
    