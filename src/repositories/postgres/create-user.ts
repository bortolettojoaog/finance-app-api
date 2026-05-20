import { PostgresHelper } from '../../db/postgres/helper';
import { CreateUserParams } from '../../types/user/create-user-params';
import { User } from '../../types/user/return-user';

export class PostgresCreateUserRepository {
    async execute(createUserParams: CreateUserParams): Promise<User> {
        // create user in postgres database
        await PostgresHelper.query(
            'INSERT INTO users (id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)',
            [
                createUserParams.id,
                createUserParams.first_name,
                createUserParams.last_name,
                createUserParams.email,
                createUserParams.password,
            ],
        );

        const createdUser = await PostgresHelper.query(
            'SELECT id, first_name, last_name, email FROM users WHERE id = $1',
            [createUserParams.id],
        );

        return createdUser[0];
    }
}
