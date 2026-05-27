import { User } from '../types';

interface IGetUserByIdRepository {
    execute(userId: string): Promise<User>;
}

export class GetUserByIdUseCase {
    private readonly getUserByIdRepository: IGetUserByIdRepository;

    constructor(getUserByIdRepository: IGetUserByIdRepository) {
        this.getUserByIdRepository = getUserByIdRepository;
    }

    async execute(userId: string): Promise<User> {
        const user = await this.getUserByIdRepository.execute(userId);

        return user;
    }
}
