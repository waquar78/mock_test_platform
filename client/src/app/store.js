import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"; 
import { AuthApi } from "../features/auth/authApi";
import { questionApi } from "../features/question/questionApi"; 
import { DashboardApi } from "../features/dashboard/dashboardApi";

const store = configureStore({
  reducer: {
    auth: authReducer,


    [AuthApi.reducerPath]: AuthApi.reducer,
  
    [questionApi.reducerPath]: questionApi.reducer,
    [DashboardApi.reducerPath]: DashboardApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(AuthApi.middleware)
      .concat(questionApi.middleware) 
      .concat(DashboardApi.middleware),

  devTools: true, // Redux DevTools enabled
});

export default store;