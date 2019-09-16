import * as express from 'express';
import { routerMiddleware } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';
import createHistory from 'store/history';
import { Action } from 'store/app/types';
import { RootState } from 'store/rootReducer';
import rootEpic from 'store/rootEpic';
import { configureStore } from '../../shared/store';

const addStore = (
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
): void => {
    const history = createHistory();
    const epicMiddleware = createEpicMiddleware<Action, Action, RootState>();
    res.locals.store = configureStore({ middleware: [routerMiddleware(history), epicMiddleware] });
    epicMiddleware.run(rootEpic);
    next();
};

export default addStore;
