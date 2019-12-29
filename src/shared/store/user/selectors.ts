/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';
import { UserState, User } from './types';

export const user = (state: { user: UserState }): UserState => state.user;

export const getUser = createSelector([user], (user): User => user.user as User);

export const isUserLoading = createSelector([user], (user): boolean => user.loading);
