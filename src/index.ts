import 'dotenv/config.js';
import express, { Request, Response } from 'express';
import {
    CreateUserController,
    GetUserByIdController,
    GetUserByMailController,
    UpdateUserController,
} from './controller';
import { DeleteUserController } from './controller/delete-user';
import {
    PostgresCreateUserRepository,
    PostgresDeleteUserRepository,
    PostgresGetUserByIdRepository,
    PostgresGetUserByMailRepository,
    PostgresUpdateUserRepository,
} from './repositories/postgres';
import {
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserByIdUseCase,
    GetUserByMailUseCase,
    UpdateUserUseCase,
} from './use-cases';

const app = express();

app.use(express.json());

app.post('/api/users', async (request: Request, response: Response) => {
    const postgresCreateUserRepository = new PostgresCreateUserRepository();

    const createUserUseCase = new CreateUserUseCase(
        postgresCreateUserRepository,
    );

    const createUserController = new CreateUserController(createUserUseCase);

    const { status_code, body, error } =
        await createUserController.execute(request);

    return response.status(status_code).json(error ? { error } : body);
});

app.get('/api/users/:userId', async (request: Request, response: Response) => {
    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();

    const getUserByIdUseCase = new GetUserByIdUseCase(
        postgresGetUserByIdRepository,
    );

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

    const { status_code, body, error } =
        await getUserByIdController.execute(request);

    return response.status(status_code).json(error ? { error } : body);
});

app.get('/api/users', async (request: Request, response: Response) => {
    const postgresGetUserByMailRepository =
        new PostgresGetUserByMailRepository();

    const getUserByMailUseCase = new GetUserByMailUseCase(
        postgresGetUserByMailRepository,
    );

    const getUserByMailController = new GetUserByMailController(
        getUserByMailUseCase,
    );

    const { status_code, body, error } =
        await getUserByMailController.execute(request);

    return response.status(status_code).json(error ? { error } : body);
});

app.patch(
    '/api/users/:userId',
    async (request: Request, response: Response) => {
        const postgresUpdateUserRepository = new PostgresUpdateUserRepository();

        const updateUserUseCase = new UpdateUserUseCase(
            postgresUpdateUserRepository,
        );

        const updateUserController = new UpdateUserController(
            updateUserUseCase,
        );

        const { status_code, body, error } =
            await updateUserController.execute(request);

        return response.status(status_code).json(error ? { error } : body);
    },
);

app.delete(
    '/api/users/:userId',
    async (request: Request, response: Response) => {
        const postgresDeleteUserRepository = new PostgresDeleteUserRepository();

        const deleteUserUseCase = new DeleteUserUseCase(
            postgresDeleteUserRepository,
        );

        const deleteUserController = new DeleteUserController(
            deleteUserUseCase,
        );

        const { status_code, body, error } =
            await deleteUserController.execute(request);
        return response.status(status_code).json(error ? { error } : body);
    },
);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
