import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Reducer
import authSlice from './authSlice';
import userSlice from './userSlice';
import apiSlice from './apiSlice';
import articleSlice from './articleSlice';

const persistConfig = {
	key: 'Root',
	storage: AsyncStorage,
};
// Combine all reducers
const rootReducer = combineReducers({
	[apiSlice.reducerPath]: apiSlice.reducer,
	auth: authSlice,
	user: userSlice,
	articles: articleSlice,
});

// Create a persisted reducer
//const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(apiSlice.middleware),
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

export const persistor = persistStore(store);
