export class User {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly nickname: string,
        public readonly password: string,
        public readonly role: string
    ) { }

    static stringToUserRole(input: string): UserRole {
        switch (input) {
            case 'NORMAL':
                return UserRole.NORMAL

            case 'ADMIN':
                return UserRole.ADMIN

            default:
                throw new Error('Invalid user role')
        }
    }

    static toUserModel(user: any): User {
        return new User(
            user.id,
            user.name,
            user.email,
            user.nickname,
            user.password,
            User.stringToUserRole(user.role)
        )
    }
}

export interface SignupInputDTO {
    name: string,
    email: string,
    nickname: string,
    password: string,
    role?: string
}

export enum UserRole {
    NORMAL = 'NORMAL',
    ADMIN = 'ADMIN'
}