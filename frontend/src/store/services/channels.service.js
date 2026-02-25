import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chanelsApi = createApi({
  reducerPath: "chanelsApi",
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
    getChanels: build.query({
      query: () => "channels",
    }),
  }),
});

export const { useGetChanelsQuery } = chanelsApi;