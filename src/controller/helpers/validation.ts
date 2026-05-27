import validator from 'validator';

export const checkIfIdIsValid = (userId: string): boolean => {
    return validator.isUUID(userId);
};
