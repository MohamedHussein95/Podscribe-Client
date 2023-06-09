import apiSlice from './apiSlice';

const ARTICLE_URL = '/articles';

const articleApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		publishArticle: builder.mutation({
			query: ({ body, uid }) => ({
				url: `${ARTICLE_URL}/publish/${uid}`,
				method: 'POST',
				body: body,
			}),
		}),
		saveArticle: builder.mutation({
			query: ({ body, uid }) => ({
				url: `${ARTICLE_URL}/drafts/${uid}`,
				method: 'POST',
				body: body,
			}),
		}),
	}),

	overrideExisting: true,
});

export const { usePublishArticleMutation, useSaveArticleMutation } =
	articleApiSlice;
export default articleApiSlice;
