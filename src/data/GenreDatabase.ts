import { Database } from './Database'
import { Genre } from '../business/model/Genre'

export class GenreDatabase extends Database {
    private static tableName = 'LABENUMUSICS_GENRES'
    private static relationTableName = 'LABENUMUSICS_MUSIC_GENRES'
    private static musicTableName = 'LABENUMUSICS_MUSICS'

    public async createGenre(genre: Genre): Promise<void> {
        try {
            await this.getConnection().raw(`
                INSERT INTO ${GenreDatabase.tableName} (id, name, music_id)
                VALUES ('${genre.id}', '${genre.name}', '${genre.musicId}');
                INSERT INTO ${GenreDatabase.relationTableName} (music_id, genre_id)
                VALUES ('${genre.musicId}', '${genre.id}')
            `)
        } catch (error) {
            throw new Error(error.sqlMessage)
        } finally {
            await Database.destroyConnection()
        }
    }

    public async getGenreByName(name: string): Promise<Genre> {
        try {
            const result = await this.getConnection().raw(`
                SELECT * FROM ${GenreDatabase.tableName}
                WHERE name = '${name}'
            `)

            return result[0][0]
        } catch (error) {
            throw new Error(error.sqlMessage)
        } finally {
            await Database.destroyConnection()
        }
    }

    public async createMusicGenreRelation(musicId: string, genreId: string): Promise<void> {
        try {
            await this.getConnection().raw(`
                INSERT INTO ${GenreDatabase.relationTableName} (music_id, genre_id)
                VALUES ('${musicId}', '${genreId}')
            `)
        } catch (error) {
            throw new Error(error.sqlMessage)
        } finally {
            await Database.destroyConnection()
        }
    }

    public async getGenresByMusicId(musicTd: string): Promise<any> {
        try {
            const result = await this.getConnection().raw(`
                SELECT ${GenreDatabase.tableName}.id, name
                FROM ${GenreDatabase.musicTableName}
                LEFT JOIN ${GenreDatabase.tableName}
                ON ${GenreDatabase.musicTableName}.id = ${GenreDatabase.tableName}.music_id
                WHERE ${GenreDatabase.musicTableName}.id = '${musicTd}'
            `)

            return result[0]
        } catch (error) {
            throw new Error(error.sqlMessage)
        } finally {
            await Database.destroyConnection()
        }
    }
}