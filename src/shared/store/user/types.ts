export interface User {
    id: string;
    name: string;
    email: string;
}

export type UserState = Readonly<{
    data: User | null;
    isAnonymous: boolean;
    loading: boolean;
}>;
