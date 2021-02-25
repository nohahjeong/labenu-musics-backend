import { Request, Response } from 'express'
import { AddMusicInputDTO } from '../business/model/Music'
import { MusicBusiness } from '../business/MusicBusiness'
import { MusicDatabase } from '../data/MusicDatabase'
import { UserDatabase } from '../data/UserDatabase'
import { IdGenerator } from '../business/services/IdGenerator'
import { Authenticator } from '../business/services/Authenticator'

const musicBusiness = new MusicBusiness(
    new MusicDatabase,
    new UserDatabase,
    new IdGenerator,
    new Authenticator
)

export class MusicController {
    async addMusic(req: Request, res: Response) {
        try {
            const input: AddMusicInputDTO = {
                title: req.body.title,
                author: req.body.author,
                date: req.body.date,
                file: req.body.file,
                // genre: req.body.genre,
                album: req.body.album
            }

            const token = req.headers.authorization as string

            await musicBusiness.addMusic(input, token)

            res.status(200).send(`${input.title} added`)
        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }
    }
}