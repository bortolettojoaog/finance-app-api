import { PostgresHelper } from '../../../db/postgres/helper';
import {
    CreateTransactionParams,
    Transaction,
} from '../../../types/transaction';

export class PostgresCreateTransactionRepository {
    async execute(
        createTransactionParams: CreateTransactionParams,
    ): Promise<Transaction> {
        const transaction = await PostgresHelper.query(
            'INSERT INTO transactions (id, user_id, amount, date, type, name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, user_id, name, date, amount, type',
            [
                createTransactionParams.id,
                createTransactionParams.user_id,
                createTransactionParams.amount,
                createTransactionParams.date,
                createTransactionParams.type,
                createTransactionParams.name,
            ],
        );

        return transaction[0];
    }
}
