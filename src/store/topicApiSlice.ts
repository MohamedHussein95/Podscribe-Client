import apiSlice from './apiSlice';

const TOPICS_URL = '/topics';

const topicApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllTopics: builder.mutation({
			query: () => ({
				url: `${TOPICS_URL}/`,
				method: 'Get',
			}),
		}),
		getTopics: builder.mutation({
			query: (id) => ({
				url: `${TOPICS_URL}/${id}`,
				method: 'Get',
			}),
		}),
	}),
	overrideExisting: true,
});

export const { useGetTopicsMutation, useGetAllTopicsMutation } = topicApiSlice;
export default topicApiSlice;
