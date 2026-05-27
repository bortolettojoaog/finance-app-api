import { PostgresHelper } from '../../../db/postgres/helper';
import { UserNotFoundError } from '../../../errors';
import { FormCreateUserParams, User } from '../../../types';

export class PostgresUpdateUserRepository {
    async execute(
        userId: string,
        updateUserParams: Partial<FormCreateUserParams>,
    ): Promise<User> {
        const updateFields: string[] = [];
        const updateValues: any[] = [];

        Object.keys(updateUserParams).forEach((key) => {
            updateFields.push(`${key} = $${updateValues.length + 1}`);
            updateValues.push(
                updateUserParams[key as keyof FormCreateUserParams],
            );
        });

        updateValues.push(userId);

        const query = `
            UPDATE users 
            SET ${updateFields.join(', ')} 
            WHERE id = $${updateValues.length} 
            RETURNING id, first_name, last_name, email
        `;

        const updatedUser = await PostgresHelper.query(query, updateValues);

        if (updatedUser.length === 0) throw new UserNotFoundError();

        return updatedUser[0];
    }
}
