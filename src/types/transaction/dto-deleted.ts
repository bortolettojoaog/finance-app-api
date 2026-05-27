import { DeletedTransaction } from './';

export interface DTODeletedTransaction {
    status_code: number;
    body: null | DeletedTransaction;
    error: null | string;
}
