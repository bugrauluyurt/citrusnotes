import { getUser } from './selectors';
import { initialState } from './reducer';

const state = {
    user: initialState,
};

describe('User Selectors', () => {
    it('gets the user', () => {
        const user = getUser(state);
        expect(user).toBe(null);
    });
});
