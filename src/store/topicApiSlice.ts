import apiSlice from './apiSlice';

const TOPICS_URL = '/topics';

const topicApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTopics: builder.mutation({
			query: () => ({
				url: `${TOPICS_URL}/`,
				method: 'Get',
			}),
		}),
	}),
	overrideExisting: true,
});

export const { useGetTopicsMutation } = topicApiSlice;
export default topicApiSlice;
