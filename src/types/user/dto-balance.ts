import { UserBalance } from './return-user-balance';

export interface DTOUserBalance {
    status_code: number;
    body: null | UserBalance;
    error: null | string;
}
