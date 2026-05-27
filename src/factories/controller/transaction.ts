import { CreateTransactionController } from '../../controller/transaction/create-transaction';
import {
    PostgresCheckDeletedUserRepository,
    PostgresCreateTransactionRepository,
} from '../../repositories/postgres';
import { CreateTransactionUseCase } from '../../use-cases';

export const makeCreateTransactionController = () => {
    const createTransactionRepository =
        new PostgresCreateTransactionRepository();

    const checkDeletedUserRepository = new PostgresCheckDeletedUserRepository();

    const createTransactionUseCase = new CreateTransactionUseCase(
        createTransactionRepository,
        checkDeletedUserRepository,
    );

    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase,
    );

    return createTransactionController;
};
