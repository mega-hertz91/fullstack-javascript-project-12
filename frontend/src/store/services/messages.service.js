import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { socket, Event } from '../../socket'

const ENTITY_PATH = 'messages'

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
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
    getMessages: build.query({
      query: () => ENTITY_PATH,
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded
          socket.connect()

          const handleNewMessage = message => {
            updateCachedData(draft => {
              draft.push(message)
            })
          }

          socket.on(Event.NEW_MESSAGE, handleNewMessage)

          await cacheEntryRemoved

          socket.off(Event.NEW_MESSAGE, handleNewMessage)
          
          socket.disconnect()
        } catch (error) {
          console.error('WebSocket error:', error)
        }
      },
    }),
    createMessage: build.mutation({
      query: payload => ({
        url: ENTITY_PATH,
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
        }
      }),
    }),
    updateMessage: build.mutation({
      query: ({ id, ...payload }) => ({
        url: `${ENTITY_PATH}/${id}`,
        method: 'PATCH',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
        }
      }),
    }),
    deleteMessage: build.mutation({
      query: ({id}) => ({
        url: `${ENTITY_PATH}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useGetMessagesQuery, useCreateMessageMutation, useUpdateMessageMutation, useDeleteMessageMutation } = messagesApi
