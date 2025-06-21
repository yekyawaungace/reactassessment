import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  saveFavoriteAPI,
  getFavoritesAPI,
  deleteFavoriteAPI,
} from '../action/placeService';

export const markFavorite = createAsyncThunk('place/markFavorite', async (place) => {
  await saveFavoriteAPI(place);
  return place;
});

export const fetchFavorites = createAsyncThunk('place/fetchFavorites', async () => {
  return await getFavoritesAPI();
});

export const removeFavorite = createAsyncThunk('place/removeFavorite', async (id) => {
  await deleteFavoriteAPI(id);
  return id;
});

const placeSlice = createSlice({
  name: 'place',
  initialState: {
    place: null,
    searchHistory: [],
    favorites: [],
    error: null,
  },
  reducers: {
    setPlace: (state, action) => {
      state.place = action.payload;
    },
    addSearchHistory: (state, action) => {
      state.searchHistory.unshift(action.payload);
    },
    markFavoriteSaga: () => {},
    markFavoriteObservable: () => {},
    favoriteSuccess: (state, action) => {
      const exists = state.favorites.find(f => f.lat === action.payload.lat && f.lng === action.payload.lng);
      if (!exists) state.favorites.push(action.payload);
    },
    favoriteFailure: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(markFavorite.fulfilled, (state, action) => {
        const exists = state.favorites.find(f => f.lat === action.payload.lat && f.lng === action.payload.lng);
        if (!exists) state.favorites.push(action.payload);
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(f => f.id !== action.payload);
      });
  },
});

export const {
  setPlace,
  addSearchHistory,
  markFavoriteSaga,
  markFavoriteObservable,
  favoriteSuccess,
  favoriteFailure,
} = placeSlice.actions;

export default placeSlice.reducer;