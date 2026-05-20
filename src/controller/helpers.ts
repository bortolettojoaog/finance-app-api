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

export const notFound = (message: string) => {
    return {
        status_code: 404,
        error: message,
        body: null,
    };
};

export const internalServerError = (message?: string) => {
    return {
        status_code: 500,
        error: message || 'Internal server error',
        body: null,
    };
};
