export class Genre {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly musicId: string,
    ) { }

    static toGenreModel(genre: any): Genre {
        return new Genre(
            genre.id,
            genre.name,
            genre.musicId
        )
    }
}

export interface AddGenreInputDTO {
    genre: string[]
}