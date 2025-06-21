import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { saveFavoriteAPI } from '../action/placeService';
import { favoriteSuccess, favoriteFailure } from '../reducer/placeSlice';

export const markFavoriteEpic = (action$) =>
  action$.pipe(
    ofType('place/markFavoriteObservable'),
    mergeMap(action =>
      from(saveFavoriteAPI(action.payload)).pipe(
        mergeMap(() => of(favoriteSuccess(action.payload))),
        catchError((error) => of(favoriteFailure(error.message)))
      )
    )
  );