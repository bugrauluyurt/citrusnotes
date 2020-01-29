import { createSelector } from 'reselect';
import { UserState, User } from './types';

export const user = (state: { user: UserState }): UserState => state.user;

export const getUser = createSelector([user], (user): User => user.data as User);
export const isUserAnonymous = createSelector([user], (user): boolean => user.isAnonymous);
export const isUserLoading = createSelector([user], (user): boolean => user.loading);
export const getUserError = createSelector([user], (user): string => user.error);
