import { PostgresHelper } from '../../../db/postgres/helper';
import { DeletedTransaction } from '../../../types';

export class PostgresCheckDeletedTransactionRepository {
    async execute(transactionId: string): Promise<DeletedTransaction> {
        const transaction = await PostgresHelper.query(
            'SELECT id FROM transactions WHERE id = $1 AND active = false',
            [transactionId],
        );

        return { active: !transaction.length };
    }
}
