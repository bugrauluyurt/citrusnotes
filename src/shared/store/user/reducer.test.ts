import reducer, { initialState } from './reducer';
import { UserActions } from './actions';

const user = {
    name: 'Bugra',
    id: '1234feAb',
    email: 'myemail@gmail.com',
};

describe('User Reducer', () => {
    it('starts fetching user', () => {
        expect(
            reducer(initialState, { type: UserActions.FETCH_USER_SUCCESS, payload: user })
        ).toEqual({
            user: null,
            loading: true,
        });
    });
    it('sets user', () => {
        expect(
            reducer(initialState, { type: UserActions.FETCH_USER_SUCCESS, payload: user })
        ).toEqual({
            user: user,
            loading: false,
        });
    });
    it('empties user after error', () => {
        expect(
            reducer(initialState, { type: UserActions.FETCH_USER_ERROR, payload: null })
        ).toEqual({
            user: null,
            loading: false,
        });
    });
});
