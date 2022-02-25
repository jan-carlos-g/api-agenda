import http from 'http'
import express from 'express'
import cors from "cors"
import { ExceptionHandler } from './shared/middlewares/exceptionHandler'
import { ExceptionParams } from './shared/middlewares/exceptionParams'
import { routes } from './shared/routes/index'

const app = express()

// app.use((req, res, next) => {
//     console.log(`[${req.method}] - ${req.originalUrl}`)
//     return next()
// })

app.use(cors())

app.use(express.json())

app.use(routes)

app.use(ExceptionParams)

app.use(ExceptionHandler)

export const serverHttp = http.createServer(app)