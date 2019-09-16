import reducer, { initialState } from './reducer';
import { AppActions } from './actions';

describe('App Reducer', () => {
    it('sets the locale', () => {
        expect(reducer(initialState, { type: AppActions.SET_LOCALE, payload: 'de_DE' })).toEqual({
            locale: 'de_DE',
        });
    });
});
