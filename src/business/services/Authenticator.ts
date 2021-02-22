import * as jwt from 'jsonwebtoken'

interface AuthenticationData {
    id: string,
    role?: string
}

export class Authenticator {
    public generateToken(
        input: AuthenticationData,
        expiresIn: string = process.env.JWT_EXPIRE_TIME!
    ): string {
        const token = jwt.sign(
            {
                id: input.id,
                role: input.role
            },
            process.env.JWT_KEY as string,
            { expiresIn }
        )

        return token
    }

    public getTokenData(token: string): AuthenticationData {
        const payload = jwt.verify(token, process.env.JWT_KEY as string) as any
        const result = {
            id: payload.id,
            role: payload.role
        }

        return result
    }
}