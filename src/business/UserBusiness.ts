import { UserDatabase } from '../data/UserDatabase'
import { IdGenerator } from './services/IdGenerator'
import { HashManager } from './services/HashManager'
import { Authenticator } from './services/Authenticator'
import { SignupInputDTO, User, UserRole } from './model/User'

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) { }

    async createUser(user: SignupInputDTO) {
        console.log("------------Business------------")
        console.log(user.email)
        if (!user.name || !user.email || !user.password) {
            console.log('1?')
            throw new Error('Missing input')
        }

        if (user.email.indexOf("@") === -1) {
            console.log('2?')
           throw new Error('Address must have an @')
        }
  
        if (user.password.length < 6) {
            console.log('3?')
           throw new Error('Password must have at least 6 characters')
        }
  
        if (user.role !== UserRole.ADMIN && user.role !== UserRole.NORMAL) {
            console.log('4?')
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
        console.log(acessToken)

        return acessToken
    }
}