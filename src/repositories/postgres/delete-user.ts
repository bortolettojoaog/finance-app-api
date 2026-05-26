import { PostgresHelper } from '../../db/postgres/helper';
import { DTOUser } from '../../types';

export class PostgresDeleteUserRepository {
    async execute(userId: string): Promise<DTOUser> {
        const deletedUser = await PostgresHelper.query(
            'UPDATE users SET active = false WHERE id = $1 RETURNING id, first_name, last_name, email',
            [userId],
        );

        return deletedUser[0];
    }
}
