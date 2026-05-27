import { PostgresHelper } from '../../db/postgres/helper';
import { User } from '../../types';

export class PostgresDeleteUserRepository {
    async execute(userId: string): Promise<User> {
        const deletedUser = await PostgresHelper.query(
            'UPDATE users SET active = false WHERE id = $1 RETURNING id, first_name, last_name, email',
            [userId],
        );

        return deletedUser[0];
    }
}
