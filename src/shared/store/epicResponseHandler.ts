import * as _ from 'lodash';
import { Action } from 'store/app/types';

export const epicResponseHandler = (
    response: any | Error,
    actions: Array<(payload: any) => Action>
): Action => {
    return !(response instanceof Error)
        ? actions[0](_.get(response, 'data'))
        : actions[1](response.message);
};
