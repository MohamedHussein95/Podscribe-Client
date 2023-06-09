import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userInfo: {},
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateUserInfo: (state, action) => {
			const updatedInfo = { ...state.userInfo, ...action.payload };
			state.userInfo = updatedInfo;
		},
	},
});

export const { updateUserInfo } = userSlice.actions;

export default userSlice.reducer;
