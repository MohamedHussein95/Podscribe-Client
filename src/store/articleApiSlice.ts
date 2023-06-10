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
		getArticleByTopic: builder.mutation({
			query: (tid) => ({
				url: `${ARTICLE_URL}/topic/${tid}`,
				method: 'GET',
			}),
		}),
	}),

	overrideExisting: true,
});

export const {
	usePublishArticleMutation,
	useSaveArticleMutation,
	useGetArticleByTopicMutation,
} = articleApiSlice;
export default articleApiSlice;
