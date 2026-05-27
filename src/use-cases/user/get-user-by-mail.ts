import { UserNotFoundError } from '../../errors';
import { User } from '../../types';

interface IGetUserByMailRepository {
    execute(email: string): Promise<User | null>;
}

export class GetUserByMailUseCase {
    private readonly postgresGetUserByMailRepository: IGetUserByMailRepository;

    constructor(getUserByMailRepository: IGetUserByMailRepository) {
        this.postgresGetUserByMailRepository = getUserByMailRepository;
    }

    async execute(email: string): Promise<User | null> {
        const user = await this.postgresGetUserByMailRepository.execute(email);

        if (!user) throw new UserNotFoundError();

        return user;
    }
}
