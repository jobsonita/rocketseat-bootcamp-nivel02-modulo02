import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'

import './database'

import { tmpDir } from './config/upload'

import AppError from './errors/AppError'

import routes from './routes'

const app = express()

app.use(express.json())

app.use(routes)

app.use('/files', express.static(tmpDir))

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message })
  }

  return res.status(500).json({ message: 'Internal server error' })
})

app.listen(3333, () => {
  console.log('Server started on port 3333!')
})
