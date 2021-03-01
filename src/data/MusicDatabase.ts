import { Database } from './Database'
import { Music, MusicOutputDTO } from '../business/model/Music'

export class MusicDatabase extends Database {
    private static tableName = 'LABENUMUSICS_MUSICS'

    public async createMusic(music: Music): Promise<void> {
        try {
            await this.getConnection().raw(`
                INSERT INTO ${MusicDatabase.tableName} (id, title, author, date, file, album, user_id)
                VALUES ('${music.id}', '${music.title}', '${music.author}', '${music.date}', '${music.file}', '${music.album}', '${music.userId}')
            `)
        } catch (error) {
            throw new Error(error.sqlMessage)
        } finally {
            await Database.destroyConnection()
        }
    }

    public async selectMusicsByUserId(userId: string): Promise<MusicOutputDTO> {
        try {
            // toDo
            const result = await this.getConnection().raw(`
                SELECT * FROM ${MusicDatabase.tableName}
                LEFT JOIN 
                WHERE user_id = '${userId}'
            `)

            return result[0][0]
        } catch (error) {
            throw new Error(error.sqlMessage)
        } finally {
            await Database.destroyConnection()
        }
    }
}