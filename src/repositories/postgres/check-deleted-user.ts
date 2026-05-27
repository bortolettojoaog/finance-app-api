import { PostgresHelper } from '../../db/postgres/helper';

export class PostgresCheckDeletedUserRepository {
    async execute(userId: string): Promise<boolean> {
        const user = await PostgresHelper.query(
            'SELECT id FROM users WHERE id = $1 AND active = false',
            [userId],
        );

        return user.length > 0;
    }
}
