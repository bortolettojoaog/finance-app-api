import { PostgresHelper } from '../../db/postgres/helper';
import { User } from '../../types';

export class PostgresGetUserByMailRepository {
    async execute(email: string): Promise<User | null> {
        const user = await PostgresHelper.query(
            'SELECT id, first_name, last_name, email FROM users WHERE email = $1',
            [email],
        );

        if (user.length === 0) return null;

        return user[0];
    }
}
