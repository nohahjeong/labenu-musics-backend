import { MusicDatabase } from '../data/MusicDatabase'
import { UserDatabase } from '../data/UserDatabase'
import { IdGenerator } from './services/IdGenerator'
import { Authenticator } from './services/Authenticator'
import { AddMusicInputDTO } from './model/Music'
import { UnauthorizedError } from './error/UnauthorizedError'
import { ExpectationFailedError } from './error/ExpectationFailedError'

export class MusicBusiness {
    constructor(
        private musicDatabase: MusicDatabase,
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    async addMusic(music: AddMusicInputDTO, token: string) {
        const tokenData = this.authenticator.getTokenData(token)

        if (!tokenData) {
            throw new UnauthorizedError('Please login first')
        }

        if (!music.title || !music.author || !music.date || !music.file || !music.album) {
            throw new ExpectationFailedError('Please fill in all the fields')
        }

        const musicId = this.idGenerator.generateId()

        await this.musicDatabase.createMusic(
            {
                ...music,
                id: musicId,
                userId: tokenData.id
            }
        )
    }
}