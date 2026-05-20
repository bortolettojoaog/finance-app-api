import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { EmailAlreadyInUseError } from '../errors/user';
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user';
import { PostgresGetUserByMailRepository } from '../repositories/postgres/get-user-by-mail';
import { CreateUserParams } from '../types/user/create-user-params';
import { FormCreateUserParams } from '../types/user/form-create-user';
import { User } from '../types/user/return-user';

export class CreateUserUseCase {
    async execute(formCreateUserParams: FormCreateUserParams): Promise<User> {
        const postgresGetUserByMailRepository =
            new PostgresGetUserByMailRepository();

        const userAlreadyExists = await postgresGetUserByMailRepository.execute(
            formCreateUserParams.email,
        );

        if (userAlreadyExists) {
            throw new EmailAlreadyInUseError();
        }

        const userId = uuidv4();

        const hashedPassword = await bcrypt.hash(
            formCreateUserParams.password,
            10,
        );

        const userParams: CreateUserParams = {
            ...formCreateUserParams,
            id: userId,
            password: hashedPassword,
        };

        const postgresCreateUserRepository = new PostgresCreateUserRepository();

        const createdUser =
            await postgresCreateUserRepository.execute(userParams);

        return createdUser;
    }
}
