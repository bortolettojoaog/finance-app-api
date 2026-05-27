import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { EmailAlreadyInUseError } from '../errors';
import { PostgresGetUserByMailRepository } from '../repositories/postgres';
import { FormCreateUserParams, User } from '../types';
import { CreateUserParams } from '../types/';

interface ICreateUserRepository {
    execute(createUserParams: CreateUserParams): Promise<User>;
}

export class CreateUserUseCase {
    private readonly postgresCreateUserRepository: ICreateUserRepository;

    constructor(postgresCreateUserRepository: ICreateUserRepository) {
        this.postgresCreateUserRepository = postgresCreateUserRepository;
    }

    async execute(formCreateUserParams: FormCreateUserParams): Promise<User> {
        const postgresGetUserByMailRepository =
            new PostgresGetUserByMailRepository();

        const userAlreadyExists = await postgresGetUserByMailRepository.execute(
            formCreateUserParams.email,
        );

        if (userAlreadyExists) {
            throw new EmailAlreadyInUseError(formCreateUserParams.email);
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

        const createdUser =
            await this.postgresCreateUserRepository.execute(userParams);

        return createdUser;
    }
}
