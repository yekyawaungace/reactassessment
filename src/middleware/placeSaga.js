import { put, takeEvery } from 'redux-saga/effects';
import { saveFavoriteAPI } from '../action/placeService';
import { favoriteSuccess, favoriteFailure } from '../reducer/placeSlice';

function* handleMarkFavorite(action) {
  try {
    yield saveFavoriteAPI(action.payload);
    yield put(favoriteSuccess(action.payload));
  } catch (error) {
    yield put(favoriteFailure(error.toString()));
  }
}

export function* watchFavoriteSaga() {
  yield takeEvery('place/markFavoriteSaga', handleMarkFavorite);
}