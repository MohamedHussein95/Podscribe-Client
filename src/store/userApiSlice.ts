import apiSlice from "./apiSlice";

const USERS_URL = "/users";

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
    uploadUserToDB: builder.mutation({
      query: ({ body, uid }) => ({
        url: `${USERS_URL}/addToDB/${uid}`,
        method: "POST",
        body,
      }),
    }),
    getUsers: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/`,
        method: "GET",
      }),
    }),
    getUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
        timeout: 3000,
      }),
    }),
    getUserFollowersFollowings: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/followers_followings/${id}`,
        method: "GET",
      }),
    }),
    getUserNotifications: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/notification/${id}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: ({ body, userId }) => ({
        url: `${USERS_URL}/${userId}`,
        method: "PUT",
        body,
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
  useGetUserNotificationsMutation,
  useUpdateUserMutation,
} = usersApiSlice;
export default usersApiSlice;
