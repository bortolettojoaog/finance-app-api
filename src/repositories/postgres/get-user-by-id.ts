import { PostgresHelper } from '../../db/postgres/helper';
import { UserNotFoundError } from '../../errors/user';
import { User } from '../../types';

export class PostgresGetUserByIdRepository {
    async execute(userId: string): Promise<User> {
        const user = await PostgresHelper.query(
            'SELECT id, first_name, last_name, email FROM users WHERE id = $1',
            [userId],
        );

        if (user.length === 0) throw new UserNotFoundError();

        return user[0];
    }
}
