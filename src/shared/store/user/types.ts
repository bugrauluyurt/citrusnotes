export enum UserRole {
    ADMIN = 'admin',
    BASIC = 'basic',
    SERVER = 'server',
    PROJECT_ADMIN = 'projectAdmin',
    PROJECT_MANAGER = 'projectManager',
}

export interface User {
    _id: string;
    companies: string[];
    roles: UserRole[];
    name: string;
    email: string;
    phone: string;
    address: string;
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
