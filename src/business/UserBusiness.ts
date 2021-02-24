import { UserDatabase } from '../data/UserDatabase'
import { IdGenerator } from './services/IdGenerator'
import { HashManager } from './services/HashManager'
import { Authenticator } from './services/Authenticator'
import { LoginInputDTO, SignupInputDTO, User, UserRole } from './model/User'

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) { }

    async createUser(user: SignupInputDTO) {
        if (!user.name || !user.email || !user.password) {
            throw new Error('Missing input')
        }

        if (user.email.indexOf("@") === -1) {
           throw new Error('Address must have an @')
        }
  
        if (user.password.length < 6) {
           throw new Error('Password must have at least 6 characters')
        }
  
        if (user.role !== UserRole.ADMIN && user.role !== UserRole.NORMAL) {
           throw new Error('User role must be "NORMAL" or "ADMIN"')
        }

        const userId = this.idGenerator.generateId()
        const hashPassword = await this.hashManager.generateHash(user.password)

        await this.userDatabase.createUser(
            User.toUserModel({
                ...user,
                id: userId,
                password: hashPassword
            })
        )

        const acessToken = this.authenticator.generateToken({
            id: userId,
            role: user.role
        })

        return acessToken
    }

    async authUserByEmail(user: LoginInputDTO) {
        if (!user.email || !user.password) {
            throw new Error('Missing "email" and/or "password"')
        }

        const userFromDB = await this.userDatabase.getUserByEmail(user.email)
        console.log(userFromDB)
        if (!userFromDB) {
            throw new Error('Email not registered')
        }
        const isPasswordCorrect = await this.hashManager.compareHash(user.password, userFromDB.password)

        if (!isPasswordCorrect) {
            throw new Error('Wrong password')
        }

        const acessToken = this.authenticator.generateToken({
            id: userFromDB.id,
            role: userFromDB.role
        })

        return acessToken
    }
}