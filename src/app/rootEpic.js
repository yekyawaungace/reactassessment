import { combineEpics } from 'redux-observable';
import { markFavoriteEpic } from '../middleware/placeEpic';

export default combineEpics(
  markFavoriteEpic
);