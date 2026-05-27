export class EmailAlreadyInUseError extends Error {
    constructor(email: string) {
        super(
            `The email ${email} is already in use. Please choose a different email.`,
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
