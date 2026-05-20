import { PostgresHelper } from '../../db/postgres/helper';
import { User } from '../../types/user/return-user';

export class PostgresGetUserByIdRepository {
    async execute(userId: string): Promise<User> {
        const user = await PostgresHelper.query(
            'SELECT * FROM users WHERE id = $1',
            [userId],
        );

        return user[0];
    }
}
