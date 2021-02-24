import { Request, Response } from 'express'
import { SignupInputDTO } from '../business/model/User'
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
        console.log("------------Controller------------")
        try {
            console.log("------------TRY------------")
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
            console.log("------------CATCH------------")
            console.log({error: error.message})
            res.status(400).send({ error: error.messsage })
        }
    }
}