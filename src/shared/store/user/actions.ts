import { Action } from 'store/app/types';
import { LoginParams, RegisterParams, User } from './types';

export enum UserActions {
    FETCH_USER = 'USER::FETCH_USER',
    FETCH_USER_SUCCESS = 'USER::FETCH_USER_SUCCESS',
    FETCH_USER_ERROR = 'USER::FETCH_USER_ERROR',
    LOGIN_USER = 'USER::LOGIN_USER',
    REGISTER_USER = 'USER::REGISTER_USER',
    USER_AUTHENTICATION_SUCCESS = 'USER::USER_AUTHENTICATION_SUCCESS',
    USER_AUTHENTICATION_ERROR = 'USER::USER_AUTHENTICATION_ERROR',
}

// Fetch User
export const fetchUser = (userId: number): Action => {
    return { type: UserActions.FETCH_USER, payload: userId };
};

export const fetchUserSuccess = (user: User): Action => {
    return { type: UserActions.FETCH_USER_SUCCESS, payload: user };
};

export const fetchUserError = (error: any): Action => {
    return { type: UserActions.FETCH_USER_ERROR, payload: error };
};

// Authentication - Login User
export const userLogin = (loginParams: LoginParams): Action => {
    return { type: UserActions.LOGIN_USER, payload: loginParams };
};

// Authentication - Register User
export const userRegister = (registerParams: RegisterParams): Action => {
    return { type: UserActions.REGISTER_USER, payload: registerParams };
};

// Authentication - Success
export const userAuthenticationSuccess = (user: User): Action => {
    return { type: UserActions.USER_AUTHENTICATION_SUCCESS, payload: user };
};

// Authentication - Error
export const userAuthenticationError = (error: any): Action => {
    return { type: UserActions.USER_AUTHENTICATION_ERROR, payload: error };
};
