import * as express from 'express';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'store/history';
import { configureStore } from '../../shared/store';

const addStore = (
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
): void => {
    const history = createHistory();
    res.locals.store = configureStore({ middleware: [routerMiddleware(history)] });
    next();
};

export default addStore;
