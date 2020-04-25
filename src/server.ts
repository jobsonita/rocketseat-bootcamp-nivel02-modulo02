import 'reflect-metadata'
import express from 'express'

import './database'

import { tmpDir } from './config/upload'

import routes from './routes'

const app = express()

app.use(express.json())

app.use(routes)

app.use('/files', express.static(tmpDir))

app.listen(3333, () => {
  console.log('Server started on port 3333!')
})
