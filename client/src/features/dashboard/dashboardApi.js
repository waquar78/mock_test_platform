import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_DASHBOARD_URL;

export const DashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include", 
  }),
  endpoints: (builder) => ({
    // Save quiz result (POST request)
    saveResult: builder.mutation({
      query: (resultData) => ({
        url: "/save",
        method: "POST",
        body: resultData,
      }),
    }),

    // Get user results 
    getUserResults: builder.query({
      query: () => ({
        url: "/get",
        method: "GET",
      }),
    }),
  }),
});


export const { 
  useSaveResultMutation, 
  useGetUserResultsQuery 
} = DashboardApi;
