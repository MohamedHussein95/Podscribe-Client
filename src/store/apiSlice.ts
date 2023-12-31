import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";

const baseQuery = fetchBaseQuery({
  baseUrl: Constants.manifest?.extra?.baseURl,
  timeout: 30000,
});
console.log(Constants.manifest?.extra);

const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery,
  tagTypes: ["user,articles,auth,topic"],
  endpoints: (builder) => ({}),
});

export default apiSlice;
