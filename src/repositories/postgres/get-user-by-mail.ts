import { PostgresHelper } from '../../db/postgres/helper';
import { UserNotFoundError } from '../../errors/user';
import { User } from '../../types/user/return-user';

export class PostgresGetUserByMailRepository {
    async execute(email: string): Promise<User> {
        const user = await PostgresHelper.query(
            'SELECT id, first_name, last_name, email FROM users WHERE email = $1',
            [email],
        );

        if (user.length === 0) throw new UserNotFoundError();

        return user[0];
    }
}
