import apiSlice from './apiSlice';

const USERS_URL = '/users';

const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createUser: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/create`,
				method: 'POST',
				body: data,
			}),
		}),
		uploadUserToDB: builder.mutation({
			query: ({ body, uid }) => ({
				url: `${USERS_URL}/addToDB/${uid}`,
				method: 'POST',
				body,
			}),
		}),
		getUsers: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/`,
				method: 'GET',
			}),
		}),
		getUser: builder.mutation({
			query: (id) => ({
				url: `${USERS_URL}/${id}`,
				method: 'GET',
			}),
		}),
		getUserFollowersFollowings: builder.mutation({
			query: (id) => ({
				url: `${USERS_URL}/followers_followings/${id}`,
				method: 'GET',
			}),
		}),
	}),
	overrideExisting: true,
});

export const {
	useCreateUserMutation,
	useUploadUserToDBMutation,
	useGetUsersMutation,
	useGetUserMutation,
	useGetUserFollowersFollowingsMutation,
} = usersApiSlice;
export default usersApiSlice;
