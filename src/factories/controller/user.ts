import {
    CheckDeletedUserController,
    CreateUserController,
    DeleteUserController,
    GetUserByIdController,
    GetUserByMailController,
    UpdateUserController,
} from '../../controller';
import {
    PostgresCheckDeletedUserRepository,
    PostgresCreateUserRepository,
    PostgresDeleteUserRepository,
    PostgresGetUserByIdRepository,
    PostgresGetUserByMailRepository,
    PostgresUpdateUserRepository,
} from '../../repositories/postgres';
import {
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserByIdUseCase,
    GetUserByMailUseCase,
    UpdateUserUseCase,
} from '../../use-cases';

export const makeCreateUserController = () => {
    const postgresCreateUserRepository = new PostgresCreateUserRepository();

    const postgresGetUserByMailRepository =
        new PostgresGetUserByMailRepository();

    const createUserUseCase = new CreateUserUseCase(
        postgresCreateUserRepository,
        postgresGetUserByMailRepository,
    );

    const createUserController = new CreateUserController(createUserUseCase);

    return createUserController;
};

export const makeGetUserByIdController = () => {
    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();

    const getUserByIdUseCase = new GetUserByIdUseCase(
        postgresGetUserByIdRepository,
    );

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

    return getUserByIdController;
};

export const makeGetUserByMailController = () => {
    const postgresGetUserByMailRepository =
        new PostgresGetUserByMailRepository();

    const getUserByMailUseCase = new GetUserByMailUseCase(
        postgresGetUserByMailRepository,
    );

    const getUserByMailController = new GetUserByMailController(
        getUserByMailUseCase,
    );

    return getUserByMailController;
};

export const makeCheckDeletedUserController = () => {
    const postgresCheckDeletedUserRepository =
        new PostgresCheckDeletedUserRepository();

    const checkDeletedUserController = new CheckDeletedUserController(
        postgresCheckDeletedUserRepository,
    );

    return checkDeletedUserController;
};

export const makeUpdateUserController = () => {
    const postgresUpdateUserRepository = new PostgresUpdateUserRepository();

    const postgresGetUserByMailRepository =
        new PostgresGetUserByMailRepository();

    const updateUserUseCase = new UpdateUserUseCase(
        postgresUpdateUserRepository,
        postgresGetUserByMailRepository,
    );

    const updateUserController = new UpdateUserController(updateUserUseCase);

    return updateUserController;
};

export const makeDeleteUserController = () => {
    const postgresDeleteUserRepository = new PostgresDeleteUserRepository();

    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();

    const checkDeletedUserRepository = new PostgresCheckDeletedUserRepository();

    const deleteUserUseCase = new DeleteUserUseCase(
        postgresDeleteUserRepository,
        postgresGetUserByIdRepository,
        checkDeletedUserRepository,
    );

    const deleteUserController = new DeleteUserController(deleteUserUseCase);

    return deleteUserController;
};
