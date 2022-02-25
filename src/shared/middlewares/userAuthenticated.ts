import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from '../errors/AppError'

const UserAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    // Verifica se o token JWT foi enviado no cabeçalho da requisição
    if (!authHeader) throw new AppError('JWT_ERROR', 400)

    // Retira o 'Bearer' que vem antes do token JWT no atributo 'authorization' do cabeçalho da requisição
    const token = authHeader.split(' ')[1]

    //Verifica se o token JWT é válido
    try {
        const decoded = verify(token, process.env.JWT_SECRET as string)

        // Adiciona à requisição o atributo 'user' que contém o 'id' do usuário provedor do token JWT passado no cabeçalho da requisição
        req.user = { id: decoded.sub as string }

        return next()
    } catch (err) {
        throw new AppError("JWT_ERROR", 400)
    }
}

module.exports = { UserAuthenticated }