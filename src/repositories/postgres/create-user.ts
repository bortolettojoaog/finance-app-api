import { PostgresHelper } from '../../db/postgres/helper';
import { CreateUserParams } from '../../types/user/create-user-params';
import { User } from '../../types/user/return-user';

export class PostgresCreateUserRepository {
    async execute(createUserParams: CreateUserParams): Promise<User> {
        // create user in postgres database
        const result = await PostgresHelper.query(
            'INSERT INTO users (id, first_name, last_name, email) VALUES ($1, $2, $3, $4)',
            [
                createUserParams.id,
                createUserParams.first_name,
                createUserParams.last_name,
                createUserParams.email,
            ],
        );

        return result[0];
    }
}
