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

    // static stringToDate(input: string): Date {
    //     const dateArray = input.split('/')

    //     return new Date(input)
    // }
}

export interface AddMusicInputDTO {
    title: string,
    author: string,
    date: Date,
    file: string,
    album: string,
    // genre: string[]
}