import { PostgresHelper } from '../../../db/postgres/helper';
import { DeletedUser } from '../../../types';

export class PostgresCheckDeletedUserRepository {
    async execute(userId: string): Promise<DeletedUser> {
        const user = await PostgresHelper.query(
            'SELECT id FROM users WHERE id = $1 AND active = false',
            [userId],
        );

        return { active: !user.length };
    }
}
