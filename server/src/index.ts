import express, { Express, Request, Response } from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import dotenv from 'dotenv'

import mongoose from 'mongoose'

import router from './routers'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT

app.use(
	cors({
		credentials: true,
		origin: 'http://localhost:5173',
	}),
)
// app.options('*', cors())

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/api', router())

const server = http.createServer(app)

server.listen(PORT, () => {
	console.log(`[server]: Server is running at http://localhost:${PORT}`)
})

const MONGODB_URI = process.env.MONGODB_URI

mongoose.Promise = Promise
mongoose.connect(MONGODB_URI!)
mongoose.connection.on('error', (error) => console.error(error))
