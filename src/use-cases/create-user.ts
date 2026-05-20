import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user';
import { CreateUserParams } from '../types/user/create-user-params';
import { FormCreateUserParams } from '../types/user/form-create-user';
import { User } from '../types/user/return-user';

export class CreateUserUseCase {
    async execute(formCreateUserParams: FormCreateUserParams): Promise<User> {
        // TODO: check if user already exists in postgres database

        const userId = uuidv4();

        // cript password
        const hashedPassword = await bcrypt.hash(
            formCreateUserParams.password,
            10,
        );

        const userParams: CreateUserParams = {
            ...formCreateUserParams,
            id: userId,
            password: hashedPassword,
        };

        // create user in postgres database
        const postgresCreateUserRepository = new PostgresCreateUserRepository();

        const createdUser =
            await postgresCreateUserRepository.execute(userParams);

        return createdUser;
    }
}
