import { UserNotFoundError } from '../errors/user';
import { User } from '../types';

interface IGetUserByMailRepository {
    execute(email: string): Promise<User | null>;
}

export class GetUserByMailUseCase {
    private readonly getUserByMailRepository: IGetUserByMailRepository;

    constructor(getUserByMailRepository: IGetUserByMailRepository) {
        this.getUserByMailRepository = getUserByMailRepository;
    }

    async execute(email: string): Promise<User | null> {
        const user = await this.getUserByMailRepository.execute(email);

        if (!user) throw new UserNotFoundError();

        return user;
    }
}
