import bcrypt from 'bcrypt';
import { EmailAlreadyInUseError } from '../../errors';
import { FormCreateUserParams, User } from '../../types';

interface IUpdateUserRepository {
    execute(
        userId: string,
        updateUserParams: Partial<FormCreateUserParams>,
    ): Promise<User>;
}

interface IGetUserByMailRepository {
    execute(email: string): Promise<User | null>;
}

export class UpdateUserUseCase {
    private readonly postgresUpdateUserRepository: IUpdateUserRepository;
    private readonly postgresGetUserByMailRepository: IGetUserByMailRepository;

    constructor(
        postgresUpdateUserRepository: IUpdateUserRepository,
        postgresGetUserByMailRepository: IGetUserByMailRepository,
    ) {
        this.postgresUpdateUserRepository = postgresUpdateUserRepository;
        this.postgresGetUserByMailRepository = postgresGetUserByMailRepository;
    }

    async execute(
        userId: string,
        updateUserParams: Partial<FormCreateUserParams>,
    ): Promise<User> {
        if (updateUserParams.email) {
            const userAlreadyExists =
                await this.postgresGetUserByMailRepository.execute(
                    updateUserParams.email,
                );

            if (userAlreadyExists && userAlreadyExists.id !== userId) {
                throw new EmailAlreadyInUseError(updateUserParams.email);
            }
        }

        const userTobeUpdated = {
            ...updateUserParams,
        };

        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            );

            userTobeUpdated.password = hashedPassword;
        }

        const updatedUser = await this.postgresUpdateUserRepository.execute(
            userId,
            userTobeUpdated,
        );

        return updatedUser;
    }
}
