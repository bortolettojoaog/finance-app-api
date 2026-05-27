import { User } from '../../types';

interface IGetUserByIdRepository {
    execute(userId: string): Promise<User>;
}

export class GetUserByIdUseCase {
    private readonly postgresGetUserByIdRepository: IGetUserByIdRepository;

    constructor(getUserByIdRepository: IGetUserByIdRepository) {
        this.postgresGetUserByIdRepository = getUserByIdRepository;
    }

    async execute(userId: string): Promise<User> {
        const user = await this.postgresGetUserByIdRepository.execute(userId);

        return user;
    }
}
