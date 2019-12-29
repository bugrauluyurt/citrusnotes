import * as express from 'express';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'connected-react-router';
import { Action } from 'store/app/types';
import { RootState } from 'store/rootReducer';
import rootEpic from 'store/rootEpic';
import { configureStore } from '../../shared/store';

const addStore = (
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
): void => {
    const epicMiddleware = createEpicMiddleware<Action, Action, RootState>();
    res.locals.store = configureStore({
        middleware: [routerMiddleware(res.locals.history), epicMiddleware],
        history: res.locals.history,
    });
    epicMiddleware.run(rootEpic);
    next();
};

export default addStore;
