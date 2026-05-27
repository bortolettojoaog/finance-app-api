import {
    GetTransactionByIdController,
    UpdateTransactionController,
} from '../../controller/transaction';
import { CheckDeletedTransactionController } from '../../controller/transaction/check-deleted-transaction';
import { CreateTransactionController } from '../../controller/transaction/create-transaction';
import {
    PostgresCheckDeletedTransactionRepository,
    PostgresCheckDeletedUserRepository,
    PostgresCreateTransactionRepository,
    PostgresGetTransactionByIdRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateTransactionRepository,
} from '../../repositories/postgres';
import {
    CreateTransactionUseCase,
    GetTransactionByIdUseCase,
    UpdateTransactionUseCase,
} from '../../use-cases';

export const makeCreateTransactionController = () => {
    const postgresCreateTransactionRepository =
        new PostgresCreateTransactionRepository();

    const postgresCheckDeletedUserRepository =
        new PostgresCheckDeletedUserRepository();

    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();

    const createTransactionUseCase = new CreateTransactionUseCase(
        postgresCreateTransactionRepository,
        postgresGetUserByIdRepository,
        postgresCheckDeletedUserRepository,
    );

    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase,
    );

    return createTransactionController;
};

export const makeCheckDeletedTransactionController = () => {
    const postgresCheckDeletedTransactionRepository =
        new PostgresCheckDeletedTransactionRepository();

    const checkDeletedUserController = new CheckDeletedTransactionController(
        postgresCheckDeletedTransactionRepository,
    );

    return checkDeletedUserController;
};

export const makeGetTransactionByIdController = () => {
    const postgresGetTransactionByIdRepository =
        new PostgresGetTransactionByIdRepository();

    const getTransactionByIdUseCase = new GetTransactionByIdUseCase(
        postgresGetTransactionByIdRepository,
    );

    const getTransactionByIdController = new GetTransactionByIdController(
        getTransactionByIdUseCase,
    );

    return getTransactionByIdController;
};

export const makeUpdateTransactionController = () => {
    const postgresUpdateTransactionRepository =
        new PostgresUpdateTransactionRepository();

    const postgresGetTransactionByIdRepository =
        new PostgresGetTransactionByIdRepository();

    const updateTransactionUseCase = new UpdateTransactionUseCase(
        postgresUpdateTransactionRepository,
        postgresGetTransactionByIdRepository,
    );

    const updateTransactionController = new UpdateTransactionController(
        updateTransactionUseCase,
    );

    return updateTransactionController;
};
