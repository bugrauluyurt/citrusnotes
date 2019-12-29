import * as express from 'express';
import createHistory from 'store/history';

const addHistory = (
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
): void => {
    res.locals.history = createHistory({ initialEntries: [_req.path] });
    next();
};

export default addHistory;
