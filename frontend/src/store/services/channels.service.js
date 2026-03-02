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
      return headers;
    },
  }),
  endpoints: (build) => ({
    getChanels: build.query({
      query: () => "channels",
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        try {
          await cacheDataLoaded;
          socket.connect();

          const handleNewChannel = (channel) => {
            updateCachedData((draft) => {
              draft.push(channel);
            });
          };

          const handleDeleteChannel = ({ id: channelId }) => {
            updateCachedData((draft) => {
              return draft.filter((channel) => channel.id !== channelId);
            });
          };

          socket.on("newChannel", handleNewChannel);
          socket.on("removeChannel", handleDeleteChannel);

          await cacheEntryRemoved;
          socket.off("newChannel", handleNewChannel);
          socket.off("removeChannel", handleDeleteChannel);
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
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    updateChannel: build.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `channels/${id}`,
        method: "PATCH",
        body: updatedData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    deleteChannel: build.mutation({
      query: ({ id }) => ({
        url: `channels/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetChanelsQuery, useCreateChanelMutation, useUpdateChannelMutation, useDeleteChannelMutation } = chanelsApi;