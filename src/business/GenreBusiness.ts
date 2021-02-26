import { GenreDatabase } from '../data/GenreDatabase'
import { AddGenreInputDTO, Genre } from './model/Genre'
import { IdGenerator } from './services/IdGenerator'

export class GenreBusiness {
    constructor(
        private genreDatabase: GenreDatabase,
        private idGenerator: IdGenerator
    ) {}

    // async addGenre(genreArray: AddGenreInputDTO) {
    //     for (let genre of genreArray) {
    //         const genreId = this.idGenerator.generateId()
            
    //         await this.genreDatabase.creteGenre(
    //             Genre.toGenreModel({
    //                 id: genreId,
    //                 name: genre,
    //                 musicId: 
    //             })
    //         )
    //     }
    // }
}