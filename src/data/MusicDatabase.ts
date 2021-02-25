import { Database } from './Database'
import { Music } from '../business/model/Music'

export class MusicDatabase extends Database {
    private static musicTableName = 'LABENUMUSICS_MUSICS'

    public async createMusic(music: Music): Promise<void> {
        try {
            await this.getConnection().raw(`
                INSERT INTO ${MusicDatabase.musicTableName} (id, title, author, date, file, album, user_id)
                VALUES ('${music.id}','${music.title}','${music.author}','${music.date}','${music.file}','${music.album}','${music.userId}')
            `)
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    }
}