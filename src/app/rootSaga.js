import { all } from 'redux-saga/effects';
import { watchFavoriteSaga } from '../middleware/placeSaga';

export default function* rootSaga() {
  yield all([
    watchFavoriteSaga(),
  ]);
}