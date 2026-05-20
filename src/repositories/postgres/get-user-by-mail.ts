import { PostgresHelper } from '../../db/postgres/helper';
import { User } from '../../types/user/return-user';

export class PostgresGetUserByMailRepository {
    async execute(email: string): Promise<User> {
        const user = await PostgresHelper.query(
            'SELECT id, first_name, last_name, email FROM users WHERE email = $1',
            [email],
        );
        return user[0];
    }
}
