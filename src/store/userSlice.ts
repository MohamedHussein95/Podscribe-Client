import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userInfo: {},
	bookMarks: [],
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateUserInfo: (state, action) => {
			const updatedInfo = { ...state.userInfo, ...action.payload };
			//console.log(updatedInfo);

			state.userInfo = updatedInfo;
		},
		setBookMarks: (state, action) => {
			state.bookMarks = action.payload;
		},
	},
});

export const { updateUserInfo, setBookMarks } = userSlice.actions;

export default userSlice.reducer;
