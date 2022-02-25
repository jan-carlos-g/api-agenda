import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/AppError"

export const ExceptionHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            path: err.path
        })
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error!'
    })
}