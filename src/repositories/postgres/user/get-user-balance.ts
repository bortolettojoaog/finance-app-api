import { PostgresHelper } from '../../../db/postgres/helper';
import { UserNotFoundError } from '../../../errors';
import { UserBalance } from '../../../types';

export class PostgresGetUserBalanceRepository {
    async execute(userId: string): Promise<UserBalance> {
        const userBalance = await PostgresHelper.query(
            `SELECT 
                SUM (CASE WHEN type = 'EARNING' THEN amount ELSE 0 END) AS earnings,
                SUM (CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) AS expenses,
                SUM (CASE WHEN type = 'INVESTMENT' THEN amount ELSE 0 END) AS investiments,
                (
                    SUM (CASE WHEN type = 'EARNING' THEN amount ELSE 0 END)
                    - SUM (CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END)
                    - SUM (CASE WHEN type = 'INVESTMENT' THEN amount ELSE 0 END)
                ) AS balance
             FROM transactions WHERE user_id = $1 AND active = true;
            `,
            [userId],
        );

        if (userBalance.length === 0) throw new UserNotFoundError();

        return userBalance[0];
    }
}
