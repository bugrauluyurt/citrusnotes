import { Action } from 'store/app/types';
import { User } from './types';

export enum UserActions {
    FETCH_USER = 'USER::FETCH_USER',
    FETCH_USER_SUCCESS = 'USER::FETCH_USER_SUCCESS',
    FETCH_USER_ERROR = 'USER::FETCH_USER_ERROR',
}

export const fetchUser = (userId: number): Action => {
    return { type: UserActions.FETCH_USER, payload: userId };
};

export const fetchUserSuccess = (user: User): Action => {
    return { type: UserActions.FETCH_USER_SUCCESS, payload: user };
};

export const fetchUserError = (): Action => {
    return { type: UserActions.FETCH_USER_ERROR, payload: null };
};
