import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPlace,
  addSearchHistory,
  markFavorite,
  markFavoriteSaga,
  markFavoriteObservable,
  fetchFavorites,
  removeFavorite
} from '../reducer/placeSlice';
import useGoogleAutocomplete from '../hooks/useGoogleAutocomplete';
import useGoogleMap from '../hooks/useGoogleMap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlaceSearch = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const mapRef = useRef();
  const markerRef = useRef();

  const { place, searchHistory, favorites, error } = useSelector((state) => state.place);
  const [strategy, setStrategy] = useState('thunk');

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const onPlaceSelected = (location) => {
    dispatch(setPlace(location));
    dispatch(addSearchHistory(location));
  };

  const handleFavorite = (p) => {
    switch (strategy) {
      case 'saga':
        dispatch(markFavoriteSaga(p));
        break;
      case 'observable':
        dispatch(markFavoriteObservable(p));
        break;
      default:
        dispatch(markFavorite(p));
    }
  };

  const handleRemoveFavorite = (id) => {
    dispatch(removeFavorite(id));
    toast.info('Favorite removed');
  };

  const isFavorite = (p) =>
    favorites.some((f) => f.lat === p.lat && f.lng === p.lng);

  useEffect(() => {
    if (place && isFavorite(place)) {
      toast.success(`${place.name} added to favorites!`);
    }
  }, [favorites]);

  useEffect(() => {
    if (error) toast.error(`Failed: ${error}`);
  }, [error]);

  useGoogleAutocomplete(inputRef, onPlaceSelected);
  useGoogleMap(mapRef, markerRef, place);

  return (
    <div>
      <ToastContainer />
      <input
        type="text"
        ref={inputRef}
        className="form-control mb-3"
        placeholder="Search place..."
      />
      <div ref={mapRef} style={{ height: 400 }} className="mb-4" />

      {/* Strategy Selection */}
      <div className="mb-3">
        <label className="form-label fw-bold">Select Middleware Strategy:</label>
        <div className="form-check">
          <input type="radio" name="strategy" className="form-check-input"
            value="thunk" checked={strategy === 'thunk'}
            onChange={(e) => setStrategy(e.target.value)} />
          <label className="form-check-label">Thunk</label>
        </div>
        <div className="form-check">
          <input type="radio" name="strategy" className="form-check-input"
            value="saga" checked={strategy === 'saga'}
            onChange={(e) => setStrategy(e.target.value)} />
          <label className="form-check-label">Saga</label>
        </div>
        <div className="form-check">
          <input type="radio" name="strategy" className="form-check-input"
            value="observable" checked={strategy === 'observable'}
            onChange={(e) => setStrategy(e.target.value)} />
          <label className="form-check-label">Observable</label>
        </div>
      </div>

      {/* Search History */}
      <h5>Search History</h5>
      <ul className="list-group">
        {searchHistory.map((p, i) => (
          <li key={i} className={`list-group-item d-flex justify-content-between align-items-center ${isFavorite(p) ? 'bg-warning' : ''}`}>
            <span>{isFavorite(p) && '⭐'} {p.name} - {p.address}</span>
            <button className="btn btn-sm btn-outline-primary"
              disabled={isFavorite(p)} onClick={() => handleFavorite(p)}>
              {isFavorite(p) ? 'Favorited' : 'Favorite'}
            </button>
          </li>
        ))}
      </ul>

      {/* Favorite List */}
      <h5 className="mt-4">Favorite Places</h5>
      <ul className="list-group">
        {favorites.map((f, i) => (
          <li key={f.id || i} className="list-group-item d-flex justify-content-between align-items-center">
            <span>⭐ {f.name} - {f.address}</span>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => handleRemoveFavorite(f.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceSearch;
