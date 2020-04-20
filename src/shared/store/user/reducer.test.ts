import reducer, { initialState } from './reducer';
import { UserActions } from './actions';

const user = {
    name: 'Bugra',
    id: '1234feAb',
    email: 'myemail@gmail.com',
};

describe('User Reducer', () => {
    it('starts fetching user', () => {
        expect(reducer(initialState, { type: UserActions.FETCH_USER })).toEqual({
            data: null,
            loading: true,
            error: null,
        });
    });
    it('sets user', () => {
        expect(
            reducer(initialState, { type: UserActions.FETCH_USER_SUCCESS, payload: user })
        ).toEqual({
            data: user,
            loading: false,
            error: null,
        });
    });
    it('empties user after error', () => {
        const state = reducer(initialState, { type: UserActions.FETCH_USER_ERROR, payload: null });
        expect(state.data).toEqual(null);
    });
});
