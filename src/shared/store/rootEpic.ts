import { combineEpics } from 'redux-observable';
import userEpics from './user/epics';

const rootEpic = combineEpics(...userEpics);

export default rootEpic;
