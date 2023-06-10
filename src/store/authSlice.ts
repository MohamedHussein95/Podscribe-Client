import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

type stateProps = {
	didTryAutoLogin: boolean;
	authInfo: Object;
	isAuth: null;
};

const initialState: stateProps = {
	didTryAutoLogin: false,
	authInfo: {},
	isAuth: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			try {
				if (action.payload.uid) {
					state.authInfo = action.payload;
					//console.log('action payload', action.payload);

					state.isAuth = true;
					const userId = action.payload.uid;
					AsyncStorage.setItem('userId', userId);
				}
			} catch (error) {
				console.error(error);
			}
		},
		setAuth: (state) => {
			state.isAuth = true;
		},
		setUserInfo: (state, action) => {
			try {
				if (action.payload) {
					state.authInfo = action.payload;
					const userId = action.payload.uid;
					AsyncStorage.setItem('userId', userId);
				}
			} catch (error) {
				console.error(error);
			}
		},
		setDidTryAutoLogin: (state) => {
			state.didTryAutoLogin = true;
		},
		clearCredentials: (state) => {
			state.authInfo = {};
			state.isAuth = null;
			AsyncStorage.removeItem('userId');
		},
	},
});

export const {
	setCredentials,
	setDidTryAutoLogin,
	clearCredentials,
	setUserInfo,
	setAuth,
} = authSlice.actions;

export default authSlice.reducer;
