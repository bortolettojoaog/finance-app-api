import 'dotenv/config.js';
import express, { Request, Response } from 'express';
import {
    makeCheckDeletedUserController,
    makeCreateUserController,
    makeDeleteUserController,
    makeGetUserByIdController,
    makeGetUserByMailController,
    makeUpdateUserController,
} from './factories';
import {
    makeCreateTransactionController,
    makeGetTransactionByIdController,
} from './factories/controller/transaction';

const app = express();

app.use(express.json());

app.post('/api/users', async (request: Request, response: Response) => {
    const factoryUserController = makeCreateUserController();

    const { status_code, body, error } =
        await factoryUserController.execute(request);

    return response.status(status_code).json(error ? { error } : body);
});

app.get('/api/users/:userId', async (request: Request, response: Response) => {
    const factoryGetUserByIdController = makeGetUserByIdController();

    const { status_code, body, error } =
        await factoryGetUserByIdController.execute(request);

    return response.status(status_code).json(error ? { error } : body);
});

app.get('/api/users', async (request: Request, response: Response) => {
    const factoryGetUserByMailController = makeGetUserByMailController();

    const { status_code, body, error } =
        await factoryGetUserByMailController.execute(request);

    return response.status(status_code).json(error ? { error } : body);
});

app.get(
    '/api/users/:userId/active',
    async (request: Request, response: Response) => {
        const factoryCheckDeletedUserController =
            makeCheckDeletedUserController();

        const { status_code, body, error } =
            await factoryCheckDeletedUserController.execute(request);

        return response.status(status_code).json(error ? { error } : body);
    },
);

app.patch(
    '/api/users/:userId',
    async (request: Request, response: Response) => {
        const factoryUpdateUserController = makeUpdateUserController();

        const { status_code, body, error } =
            await factoryUpdateUserController.execute(request);

        return response.status(status_code).json(error ? { error } : body);
    },
);

app.delete(
    '/api/users/:userId',
    async (request: Request, response: Response) => {
        const factoryDeleteUserController = makeDeleteUserController();

        const { status_code, body, error } =
            await factoryDeleteUserController.execute(request);

        return response.status(status_code).json(error ? { error } : body);
    },
);

app.post(
    '/api/transactions/:userId',
    async (request: Request, response: Response) => {
        const factoryCreateTransactionController =
            makeCreateTransactionController();

        const { status_code, body, error } =
            await factoryCreateTransactionController.execute(request);

        return response.status(status_code).json(error ? { error } : body);
    },
);

app.get(
    '/api/transactions/:transactionId',
    async (request: Request, response: Response) => {
        const factoryGetTransactionById = makeGetTransactionByIdController();

        const { status_code, body, error } =
            await factoryGetTransactionById.execute(request);

        return response.status(status_code).json(error ? { error } : body);
    },
);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
