export interface User {
    id: string;
    name: string;
    email: string;
}

export type UserState = Readonly<{
    user: User | null;
    loading: boolean;
}>;
