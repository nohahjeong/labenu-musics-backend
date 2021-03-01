import { MusicDatabase } from '../data/MusicDatabase'
import { GenreDatabase } from '../data/GenreDatabase'
import { IdGenerator } from './services/IdGenerator'
import { Authenticator } from './services/Authenticator'
import { AddMusicInputDTO, Music } from './model/Music'
import { UnauthorizedError } from './error/UnauthorizedError'
import { ExpectationFailedError } from './error/ExpectationFailedError'
import { Genre } from './model/Genre'

export class MusicBusiness {
    constructor(
        private musicDatabase: MusicDatabase,
        private genreDatabase: GenreDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    async addMusic(music: AddMusicInputDTO, token: string) {
        const tokenData = this.authenticator.getTokenData(token)

        if (!tokenData) {
            throw new UnauthorizedError('Please login first')
        }

        if (!music.title || !music.author || !music.date || !music.file || !music.album || !music.genre) {
            throw new ExpectationFailedError('Please fill in all the fields')
        }

        const musicId = this.idGenerator.generateId()

        await this.musicDatabase.createMusic(
            Music.toMusicModel({
                ...music,
                id: musicId,
                userId: tokenData.id
            })
        )

        for (let genreName of music.genre) {
            const genreFromDB = await this.genreDatabase.getGenreByName(genreName)

            if (genreFromDB) {
                await this.genreDatabase.createMusicGenreRelation(musicId, genreFromDB.id)
            } else {
                const genreId = this.idGenerator.generateId()

                await this.genreDatabase.createGenre(
                    Genre.toGenreModel({
                        id: genreId,
                        name: genreName,
                        musicId: musicId
                    })
                )
            }
        }
    }
}