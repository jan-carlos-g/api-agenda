import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/AppError"

export const ExceptionParams = (err: any, req: Request, res: Response, next: NextFunction) => {
    const type = err.errors ? err.errors[0].type : null
    const path: string | null = err.errors ? err.errors[0].path : null
    if (type === "unique violation") throw new AppError(`${path?.toLocaleUpperCase()} não disponível!`, 400, path)
    else if (type === "notNull Violation") throw new AppError(`${path?.toLocaleUpperCase()} obrigatório!`, 400, path)
    return next(err)
}