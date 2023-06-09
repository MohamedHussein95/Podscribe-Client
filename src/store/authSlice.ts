import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
				if (action.payload) {
					state.authInfo = action.payload;
					state.isAuth = true;
					AsyncStorage.setItem('userId', action.payload.uid);
				}
				console.log(state.authInfo);
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

					AsyncStorage.setItem('userId', action.payload.uid);
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
