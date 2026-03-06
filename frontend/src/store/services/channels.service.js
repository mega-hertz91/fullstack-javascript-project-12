import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { socket, Event } from '@/socket'
import { Method } from '@/constants'

const ENTITY_PATH = 'channels'

export const chanelsApi = createApi({
  reducerPath: 'chanelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token // access token from your auth slice
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: build => ({
    getChanels: build.query({
      query: () => ENTITY_PATH,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        try {
          await cacheDataLoaded
          socket.connect()

          const handleNewChannel = channel => {
            updateCachedData(draft => {
              draft.push(channel)
            })
          }

          const handleDeleteChannel = ({ id: channelId }) => {
            updateCachedData(draft => {
              return draft.filter(channel => channel.id !== channelId)
            })
          }

          const handleRenameChannel = updatedChannel => {
            updateCachedData(draft => {
              const index = draft.findIndex(
                channel => channel.id === updatedChannel.id,
              )
              if (index !== -1) {
                draft[index] = updatedChannel
              }
            })
          }

          socket.on(Event.NEW_CHANNEL, handleNewChannel)
          socket.on(Event.REMOVE_CHANNEL, handleDeleteChannel)
          socket.on(Event.RENAME_CHANNEL, handleRenameChannel)

          await cacheEntryRemoved
          
          socket.off(Event.NEW_CHANNEL, handleNewChannel)
          socket.off(Event.REMOVE_CHANNEL, handleDeleteChannel)
          socket.off(Event.RENAME_CHANNEL, handleRenameChannel)

          socket.disconnect()
        } catch (error) {
          console.error('WebSocket error:', error)
        }
      },
    }),
    createChanel: build.mutation({
      query: newChanel => ({
        url: ENTITY_PATH,
        method: Method.POST,
        body: newChanel,
      }),
    }),
    updateChannel: build.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `${ENTITY_PATH}/${id}`,
        method: Method.PATCH,
        body: updatedData,
      }),
    }),
    deleteChannel: build.mutation({
      query: ({ id }) => ({
        url: `${ENTITY_PATH}/${id}`,
        method: Method.DELETE,
      }),
    }),
  }),
})

export const { useGetChanelsQuery, useCreateChanelMutation, useUpdateChannelMutation, useDeleteChannelMutation } = chanelsApi
