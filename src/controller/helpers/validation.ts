import validator from 'validator';
import { RequiredFieldsCheckResponse } from '../../types';
import { badRequest } from './http';

export const missingField = (missingField: string | undefined) => {
    return badRequest(`The field '${missingField}' is required.`);
};

export const checkIfIdIsValid = (userId: string): boolean => {
    return validator.isUUID(userId);
};

export const checkIfIsString = (value: any) => typeof value === 'string';

export const validateRequiredFields = (
    params: any,
    requiredFields: string[],
): RequiredFieldsCheckResponse => {
    for (const field of requiredFields) {
        const isFieldMissing =
            params[field] === undefined || params[field] === null;

        const isFieldEmpty =
            checkIfIsString(params[field]) &&
            validator.isEmpty(params[field], {
                ignore_whitespace: true,
            });

        if (isFieldMissing || isFieldEmpty) {
            return {
                missingField: field,
                requiredFieldsWereProvided: false,
            };
        }
    }

    return {
        missingField: undefined,
        requiredFieldsWereProvided: true,
    };
};
