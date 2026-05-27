import { UserNotFoundError } from '../errors/user';
import { User } from '../types';

interface IGetUserByMailRepository {
    execute(email: string): Promise<User>;
}

export class GetUserByMailUseCase {
    private readonly getUserByMailRepository: IGetUserByMailRepository;

    constructor(getUserByMailRepository: IGetUserByMailRepository) {
        this.getUserByMailRepository = getUserByMailRepository;
    }

    async execute(email: string): Promise<User> {
        const user = await this.getUserByMailRepository.execute(email);

        if (!user) throw new UserNotFoundError();

        return user;
    }
}
