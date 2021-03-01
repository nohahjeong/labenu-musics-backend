export class Music {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly author: string,
        public readonly date: Date,
        public readonly file: string,
        public readonly album: string,
        public readonly userId: string
    ) { }

    static toMusicModel(music: any): Music {
        return new Music(
            music.id,
            music.title,
            music.author,
            music.date,
            music.file,
            music.album,
            music.userId
        )
    }
}

export interface AddMusicInputDTO {
    title: string,
    author: string,
    date: string,
    file: string,
    album: string,
    genre: string[]
}

export interface MusicOutputDTO {
    id: string,
    title: string,
    author: string,
    date: Date,
    file: string,
    album: string,
    genre: string[]
}