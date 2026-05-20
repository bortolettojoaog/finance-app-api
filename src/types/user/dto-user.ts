import { User } from './';

export interface DTOUser {
    status_code: number;
    body: null | User;
    error: null | string;
}
