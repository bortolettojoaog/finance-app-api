import { badRequest } from './http';

export const invalidUserIdResponse = () => {
    return badRequest('Invalid user ID format');
};

export const invalidPasswordResponse = () => {
    return badRequest('At least one field must be provided for update');
};

export const notFoundUserResponse = (message: string) => {
    return badRequest(message);
};

export const invalidEmailResponse = () => {
    return badRequest(
        'Invalid email format. Please provide a valid email address.',
    );
};

export const emailAlreadyInUseResponse = (message: string) => {
    return badRequest(message);
};

export const requiredIdResponse = () => {
    return badRequest('User ID is required');
};

export const allFieldAreEmptyResponse = () => {
    return badRequest('At least one field must be provided for update');
};

export const someFieldNotAllowedResponse = () => {
    return badRequest('Some provided fields are not allowed for update');
};
