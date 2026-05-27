import {
    CheckDeletedTransactionController,
    CreateTransactionController,
    DeleteTransactionController,
    GetTransactionByIdController,
    UpdateTransactionController,
} from '../../controller';
import {
    PostgresCheckDeletedTransactionRepository,
    PostgresCheckDeletedUserRepository,
    PostgresCreateTransactionRepository,
    PostgresDeleteTransactionRepository,
    PostgresGetTransactionByIdRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateTransactionRepository,
} from '../../repositories/postgres';
import {
    CreateTransactionUseCase,
    DeleteTransactionUseCase,
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

export const makeDeleteTransactionController = () => {
    const postgresDeleteTransactionRepository =
        new PostgresDeleteTransactionRepository();

    const postgresGetTransactionByIdRepository =
        new PostgresGetTransactionByIdRepository();

    const checkDeletedTransactionRepository =
        new PostgresCheckDeletedTransactionRepository();

    const deleteUserUseCase = new DeleteTransactionUseCase(
        postgresDeleteTransactionRepository,
        postgresGetTransactionByIdRepository,
        checkDeletedTransactionRepository,
    );

    const deleteTransactionController = new DeleteTransactionController(
        deleteUserUseCase,
    );

    return deleteTransactionController;
};
