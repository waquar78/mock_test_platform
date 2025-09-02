
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_QUESTION_URL; 

export const questionApi = createApi({
  reducerPath: "questionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
   
    getQuestions: builder.query({
      query: (level) => `questions/getquestions?level=${level}`,
    }),

  
    submitQuiz: builder.mutation({
      query: (bodyData) => ({
        url: "questions/submitquiz",
        method: "POST",
        body: bodyData,
      }),
    }),
  }),
});


export const { useGetQuestionsQuery, useSubmitQuizMutation } = questionApi;