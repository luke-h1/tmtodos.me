export interface Error {
    message: string;
    stack?: string;
}

export interface User {
    name: string;
    email: string;
    isAdmin: boolean;
    _id: number;
}

export interface Note {
    id: number;
    title: string;
    body: string;
    // done: boolean;
}
