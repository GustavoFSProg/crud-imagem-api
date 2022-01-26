import express from 'express'
import cors from 'cors'
import route from './routes'
import { config } from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'

config()

const { PORT, DATABASE } = process.env

mongoose.connect(String(DATABASE))

const app = express()

app.use(express.json())
app.use(cors())
app.use(route)

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))

app.listen(PORT, () => {
  console.log(` 🤘 Api Running on: ${PORT}`)
})

export default app
