import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../fetures/auth/authSlice"; 
import { AuthApi } from "../fetures/auth/authApi";
import { questionApi } from "../fetures/question/questionApi"; 
import { DashboardApi } from "../fetures/dashboard/DashboardApi"; 

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