export class EmailAlreadyInUseError extends Error {
    constructor() {
        super(
            'The provided email is already in use. Please choose a different email.',
        );
        this.name = 'EmailAlreadyInUseError';
    }
}

export class UserNotFoundError extends Error {
    constructor() {
        super('User not found. Please check the provided information.');
        this.name = 'UserNotFoundError';
    }
}
