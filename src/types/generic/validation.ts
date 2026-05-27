export interface RequiredFieldsCheckResponse {
    missingField: string | undefined;
    requiredFieldsWereProvided: boolean;
}
