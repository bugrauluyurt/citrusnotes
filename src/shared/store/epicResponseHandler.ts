import { Action } from 'store/app/types';
export const epicResponseHandler = (
    response: any | Error,
    actions: Array<(payload: any) => Action>
): Action => {
    return !(response instanceof Error) ? actions[0](response) : actions[1](response.message);
};
