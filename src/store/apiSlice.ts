import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Constants from 'expo-constants';

const baseQuery = fetchBaseQuery({
	baseUrl: Constants.manifest?.extra?.baseURl,
	timeout: 10000,
});
//console.log(Constants.manifest?.extra);

const apiSlice = createApi({
	reducerPath: 'apiSlice',
	baseQuery,
	tagTypes: ['user'],
	endpoints: (builder) => ({}),
});

export default apiSlice;
