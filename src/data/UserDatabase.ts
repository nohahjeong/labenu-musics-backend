import { Database } from './Database'
import { User } from '../business/model/User'

export class UserDatabase extends Database {
    private static tableName = "LABENUMUSICS_USERS"

    public async createUser(user: User): Promise<void> {
        try {
            await this.getConnection().raw(`
                INSERT INTO ${UserDatabase.tableName} (id, name, email, nickname, password, role)
                VALUES ('${user.id}', '${user.name}', '${user.email}', '${user.nickname}', '${user.password}', '${user.role}')
            `)
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    }
}