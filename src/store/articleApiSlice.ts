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
				timeout: 5000,
			}),
		}),
		getArticles: builder.mutation({
			query: (id) => ({
				url: `${ARTICLE_URL}/${id}`,
				method: 'GET',
				timeout: 5000,
			}),
		}),
		updateArticleReads: builder.mutation({
			query: ({ uId, aId }) => ({
				url: `${ARTICLE_URL}/reads/update/${aId}`,
				method: 'PUT',
				body: uId,
			}),
		}),
		addToBookMarks: builder.mutation({
			query: ({ body, aid }) => ({
				url: `${ARTICLE_URL}/bookmark/add/${aid}`,
				method: 'POST',
				body: body,
			}),
		}),
	}),

	overrideExisting: true,
});

export const {
	usePublishArticleMutation,
	useSaveArticleMutation,
	useGetArticleByTopicMutation,
	useUpdateArticleReadsMutation,
	useGetArticlesMutation,
	useAddToBookMarksMutation,
} = articleApiSlice;
export default articleApiSlice;
