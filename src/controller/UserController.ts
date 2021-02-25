import { Request, Response } from 'express'
import { LoginInputDTO, SignupInputDTO } from '../business/model/User'
import { UserBusiness } from '../business/UserBusiness'
import { UserDatabase } from '../data/UserDatabase'
import { IdGenerator } from '../business/services/IdGenerator'
import { HashManager } from '../business/services/HashManager'
import { Authenticator } from '../business/services/Authenticator'

const userBusiness = new UserBusiness(
    new UserDatabase,
    new IdGenerator,
    new HashManager,
    new Authenticator
)

export class UserController {
    async signup(req: Request, res: Response) {
        try {
            const input: SignupInputDTO = {
                name: req.body.name,
                email: req.body.email,
                nickname: req.body.nickname,
                password: req.body.password,
                role: req.body.role
            }

            const token = await userBusiness.createUser(input)

            res.status(200).send({ token })
        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }
    }

    async login(req: Request, res: Response) {
        try {
            const input: LoginInputDTO = {
                emailOrNickname: req.body.emailOrNickname,
                password: req.body.password
            }

            const token = await userBusiness.authUserByEmailOrNickname(input)

            res.status(200).send({ token })
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }
}