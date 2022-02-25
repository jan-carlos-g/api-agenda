import { Request, Response } from 'express'
import { deletePhonenumberService } from "../services/deletePhonenumberService"

export const deletePhonenumberController = async (req: Request, res: Response) => {
    const { id } = req.params
    const phonenumber = await deletePhonenumberService(id)
    return res.json(phonenumber)
}