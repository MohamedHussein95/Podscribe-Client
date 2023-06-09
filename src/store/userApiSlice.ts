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
				body: body,
			}),
		}),
	}),
	overrideExisting: true,
});

export const { useCreateUserMutation, useUploadUserToDBMutation } =
	usersApiSlice;
export default usersApiSlice;
