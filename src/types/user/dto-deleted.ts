import { DeletedUser } from './return-deleted';

export interface DTODeletedUser {
    status_code: number;
    body: null | DeletedUser;
    error: null | string;
}
