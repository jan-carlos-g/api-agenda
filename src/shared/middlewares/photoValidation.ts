import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/AppError"

export const photoValidation = (req: Request, res: Response, next: NextFunction) => {
    if (req.files?.length && req.files.length > 0) return next()
    throw new AppError("É necessário uma imagem para atualizar a logo", 400, "photo")
}
