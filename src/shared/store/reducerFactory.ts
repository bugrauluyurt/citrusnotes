import isFunction from 'lodash/isFunction';
import get from 'lodash/get';
import { Action } from 'store/app/types';

export const createReducer = (
    actionMap: {
        [key: string]: any;
    },
    initialState: object
): ((state: any, action: Action) => {}) => {
    return (state: any, action: Action) => {
        const reducerFn = get(actionMap, action.type);
        if (!reducerFn || !isFunction(reducerFn)) {
            return initialState;
        }
        return reducerFn(state, action);
    };
};
