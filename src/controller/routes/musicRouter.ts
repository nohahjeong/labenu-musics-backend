import express from 'express'
import { MusicController } from '../MusicController'

export const musicRouter = express.Router()

const musicController = new MusicController()

musicRouter.post('/add', musicController.addMusic)
musicRouter.get('/get', musicController.getUserMusics)