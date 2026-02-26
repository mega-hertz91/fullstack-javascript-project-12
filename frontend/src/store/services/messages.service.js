import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token; // access token from your auth slice
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      // You can set other headers too, e.g., Content-Type
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getMessages: build.query({
      query: () => `messages`,
    }),
    createMessage: build.mutation({
      query: (payload) => ({
        url: `messages`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useCreateMessageMutation } = messagesApi;