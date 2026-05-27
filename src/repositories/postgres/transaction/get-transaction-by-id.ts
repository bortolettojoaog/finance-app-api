import { PostgresHelper } from '../../../db/postgres/helper';
import { TransactionNotFoundError } from '../../../errors';
import { Transaction } from '../../../types';

export class PostgresGetTransactionByIdRepository {
    async execute(transactionId: string): Promise<Transaction> {
        const transaction = await PostgresHelper.query(
            'SELECT id, user_id, name, date, amount, type FROM transaction WHERE id = $1',
            [transactionId],
        );

        if (transaction.length === 0) throw new TransactionNotFoundError();

        return transaction[0];
    }
}
