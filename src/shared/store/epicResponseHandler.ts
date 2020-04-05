import _get from 'lodash/get';
import { Action } from 'store/app/types';

export const epicResponseHandler = (
    response: any | Error,
    actions: Array<(payload: any) => Action>
): Action => {
    return response instanceof Error
        ? actions[1](response.message)
        : actions[0](_get(response, 'data'));
};
