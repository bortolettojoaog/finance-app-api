import { PostgresHelper } from '../../../db/postgres/helper';
import { Transaction } from '../../../types';

export class PostgresDeleteTransactionRepository {
    async execute(transactionId: string): Promise<Transaction> {
        const deletedTransaction = await PostgresHelper.query(
            'UPDATE transactions SET active = false WHERE id = $1 RETURNING id, user_id, name, date, amount, type',
            [transactionId],
        );

        return deletedTransaction[0];
    }
}
