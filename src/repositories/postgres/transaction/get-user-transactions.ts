import { PostgresHelper } from '../../../db/postgres/helper';
import { TransactionNotFoundError } from '../../../errors';
import { Transaction } from '../../../types';

export class PostgresGetUserTransactionsRepository {
    async execute(userId: string): Promise<Transaction[]> {
        const transaction = await PostgresHelper.query(
            'SELECT id, user_id, name, date, amount, type FROM transactions WHERE user_id = $1 AND active = true',
            [userId],
        );

        if (transaction.length === 0) throw new TransactionNotFoundError();

        return transaction;
    }
}
