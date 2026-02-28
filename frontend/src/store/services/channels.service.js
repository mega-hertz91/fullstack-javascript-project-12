import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { socket } from "@/socket";

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
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded;
          socket.connect();

          const handleNewChannel = (channel) => {
            updateCachedData((draft) => {
              draft.push(channel);
            });
          };

          socket.on("newChannel", handleNewChannel);

          await cacheEntryRemoved;
          socket.off("newChannel", handleNewChannel);
          socket.disconnect();
        } catch (error) {
          console.error("WebSocket error:", error);
        }
      },
    }),
    createChanel: build.mutation({
      query: (newChanel) => ({
        url: "channels",
        method: "POST",
        body: newChanel,
      }),
    }),
  }),
});

export const { useGetChanelsQuery, useCreateChanelMutation } = chanelsApi;