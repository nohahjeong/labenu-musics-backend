import { UserDatabase } from '../data/UserDatabase'
import { IdGenerator } from './services/IdGenerator'
import { HashManager } from './services/HashManager'
import { Authenticator } from './services/Authenticator'
import { LoginInputDTO, SignupInputDTO, User, UserRole } from './model/User'
import { ExpectationFailedError } from './error/ExpectationFailedError'
import { NotFoundError } from './error/NotFoundError'

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) { }

    async createUser(user: SignupInputDTO) {
        if (!user.name || !user.email || !user.password || !user.nickname) {
            throw new ExpectationFailedError('Missing input')
        }

        if (user.email.indexOf("@") === -1) {
            throw new ExpectationFailedError('Address must have an @')
        }

        if (user.password.length < 6) {
            throw new ExpectationFailedError('Password must have at least 6 characters')
        }

        if (user.role !== UserRole.ADMIN && user.role !== UserRole.NORMAL) {
            throw new ExpectationFailedError('User role must be "NORMAL" or "ADMIN"')
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

    async authUserByEmailOrNickname(user: LoginInputDTO) {
        if (!user.emailOrNickname || !user.password) {
            throw new ExpectationFailedError('Please fill in with your email or nickname and your password')
        }

        let userFromDB = undefined

        if (user.emailOrNickname.indexOf("@") === -1) {
            userFromDB = await this.userDatabase.getUserByNickname(user.emailOrNickname)
        } else {
            userFromDB = await this.userDatabase.getUserByEmail(user.emailOrNickname)
        }

        if (!userFromDB) {
            throw new NotFoundError('Email or nickname not registered')
        }

        const isPasswordCorrect = await this.hashManager.compareHash(user.password, userFromDB.password)

        if (!isPasswordCorrect) {
            throw new ExpectationFailedError('Wrong password')
        }

        const acessToken = this.authenticator.generateToken({
            id: userFromDB.id,
            role: userFromDB.role
        })

        return acessToken
    }
}