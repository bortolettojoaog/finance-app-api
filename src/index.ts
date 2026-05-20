import 'dotenv/config.js';
import express, { Request, Response } from 'express';
import { CreateUserController } from './controller/create-user';

const app = express();

app.use(express.json());

app.post('/api/users', async (request: Request, response: Response) => {
    const createUserController = new CreateUserController();

    const { status_code, body, error } =
        await createUserController.execute(request);

    return response.status(status_code).json(error ? { error } : body);
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
