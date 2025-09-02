import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser,userLogout } from "./authSlice";

// Base URL
const BASE_URL = import.meta.env.VITE_AUTH_URL; 

export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include", // for cookies / sessions
  }),
  endpoints: (builder) => ({
    // Register User
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "/register",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUser(result.data.user));
        } catch (error) {
          console.log("Register error:", error);
        }
      },
    }),

    // Login User
    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "/login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUser(result.data.user));
        } catch (error) {
          console.log("Login error:", error);
        }
      },
    }),

    // Logout User
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(userLogout());
        } catch (error) {
          console.log("Logout error:", error);
        }
      },
    }),

    // Get USER PROFILE
    getUserProfile: builder.query({
      query: () => ({
        url: "/getprofile",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.user) {
            dispatch(setUser(data.user));
          }
        } catch (error) {
          console.log("Profile fetch error:", error);
        }
      },
    }),
  }),
});

// Export Hooks
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserProfileQuery,
} = AuthApi;
