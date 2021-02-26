import { Request, Response } from 'express'
import { AddMusicInputDTO } from '../business/model/Music'
import { MusicBusiness } from '../business/MusicBusiness'
import { MusicDatabase } from '../data/MusicDatabase'
import { IdGenerator } from '../business/services/IdGenerator'
import { Authenticator } from '../business/services/Authenticator'
import { GenreBusiness } from '../business/GenreBusiness'
import { GenreDatabase } from '../data/GenreDatabase'

const musicBusiness = new MusicBusiness(
    new MusicDatabase,
    new GenreDatabase,
    new IdGenerator,
    new Authenticator
)

const genreBusiness = new GenreBusiness(
    new GenreDatabase,
    new IdGenerator
)

export class MusicController {
    async addMusic(req: Request, res: Response) {
        try {
            const musicInput: AddMusicInputDTO = {
                title: req.body.title,
                author: req.body.author,
                date: req.body.date,
                file: req.body.file,
                album: req.body.album,
                genre: req.body.genre
            }

            const token = req.headers.authorization as string

            await musicBusiness.addMusic(musicInput, token)

            res.status(200).send(`${musicInput.title} added`)
        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }
    }
}