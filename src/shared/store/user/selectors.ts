import { createSelector } from 'reselect';
import _get from 'lodash/get';
import _isString from 'lodash/isString';
import { UserState, User } from './types';

export const user = (state: { user: UserState }): UserState => state.user;

export const getUser = createSelector([user], (user): User => user.data as User);
export const isUserAnonymous = createSelector([user], (user): boolean => {
    const id = _get(user, 'data.id') || _get(user, 'data._id');
    return !_isString(id);
});
export const isUserLoading = createSelector([user], (user): boolean => user.loading);
export const getUserError = createSelector([user], (user): string => user.error);
