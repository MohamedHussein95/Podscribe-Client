import { configureStore } from '@reduxjs/toolkit';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Reducer
import userSlice from './userSlice';

const persistConfig = {
	key: 'Root',
	storage: AsyncStorage,
};

const persist_reducer = persistReducer(persistConfig, userSlice);

const store = configureStore({
	reducer: {
		user: persist_reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

export const persistor = persistStore(store);
