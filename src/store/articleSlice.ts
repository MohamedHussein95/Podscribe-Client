import { createSlice } from '@reduxjs/toolkit';

type stateProps = {
	published: Array;
	drafts: Array;
};
const initialState: stateProps = {
	published: [],
	drafts: [],
};

const articleSlice = createSlice({
	name: 'article',
	initialState,
	reducers: {
		addToPublishedArticles: (state, action) => {
			const updatedArticles = [...state.published, action.payload.body];
			state.published = updatedArticles;
			//console.log(state.published);
		},
		addToDrafts: (state, action) => {
			const updatedArticles = [...state.drafts, action.payload.body];
			state.drafts = updatedArticles;
			//console.log(state.drafts);
		},
		setDrafts: (state, action) => {
			state.drafts = action.payload;
			//console.log(state.drafts);
		},
		setPublished: (state, action) => {
			state.published = action.payload;
			//console.log(state.published);
		},
	},
});

export const { addToDrafts, addToPublishedArticles, setDrafts, setPublished } =
	articleSlice.actions;

export default articleSlice.reducer;
