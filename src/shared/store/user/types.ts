export interface User {
    id: string;
    name: string;
    email: string;
}

export type UserState = Readonly<{
    data: User | null;
    loading: boolean;
    error: any;
}>;

// Api params
export interface LoginParams {
    email: string;
    password: string;
}
export interface RegisterParams {
    username: string;
    email: string;
    password: string;
}
