import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { EmailAlreadyInUseError } from '../../errors';
import { CreateUserParams, FormCreateUserParams, User } from '../../types';

interface ICreateUserRepository {
    execute(createUserParams: CreateUserParams): Promise<User>;
}

interface IGetUserByMailRepository {
    execute(email: string): Promise<User | null>;
}

export class CreateUserUseCase {
    private readonly postgresCreateUserRepository: ICreateUserRepository;
    private readonly postgresGetUserByMailRepository: IGetUserByMailRepository;

    constructor(
        postgresCreateUserRepository: ICreateUserRepository,
        postgresGetUserByMailRepository: IGetUserByMailRepository,
    ) {
        this.postgresCreateUserRepository = postgresCreateUserRepository;
        this.postgresGetUserByMailRepository = postgresGetUserByMailRepository;
    }

    async execute(formCreateUserParams: FormCreateUserParams): Promise<User> {
        const userAlreadyExists =
            await this.postgresGetUserByMailRepository.execute(
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
