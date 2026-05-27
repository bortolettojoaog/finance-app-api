import { PostgresHelper } from '../../../db/postgres/helper';
import { TransactionNotFoundError } from '../../../errors';
import { FormCreateTransactionParams, Transaction } from '../../../types';

export class PostgresUpdateTransactionRepository {
    async execute(
        transactionId: string,
        updateUserParams: Partial<FormCreateTransactionParams>,
    ): Promise<Transaction> {
        const updateFields: string[] = [];
        const updateValues: any[] = [];

        Object.keys(updateUserParams).forEach((key) => {
            updateFields.push(`${key} = $${updateValues.length + 1}`);
            updateValues.push(
                updateUserParams[key as keyof FormCreateTransactionParams],
            );
        });

        updateValues.push(transactionId);

        const query = `
                UPDATE transactions
                SET ${updateFields.join(', ')} 
                WHERE id = $${updateValues.length} 
                RETURNING id, user_id, name, date, amount, type
            `;

        const updatedTransaction = await PostgresHelper.query(
            query,
            updateValues,
        );

        if (updatedTransaction.length === 0)
            throw new TransactionNotFoundError();

        return updatedTransaction[0];
    }
}
