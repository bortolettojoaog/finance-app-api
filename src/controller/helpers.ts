export const badRequest = (message: string) => {
    return {
        status_code: 400,
        error: message,
        body: null,
    };
};

export const created = (body: any) => {
    return {
        status_code: 201,
        error: null,
        body,
    };
};

export const ok = (body: any) => {
    return {
        status_code: 200,
        error: null,
        body,
    };
};

export const internalServerError = (message?: string) => {
    return {
        status_code: 500,
        error: message || 'Internal server error',
        body: null,
    };
};
