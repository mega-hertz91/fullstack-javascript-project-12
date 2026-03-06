import { io } from 'socket.io-client'

export const Event = {
  NEW_CHANNEL: 'newChannel',
  REMOVE_CHANNEL: 'removeChannel',
  RENAME_CHANNEL: 'renameChannel',
  NEW_MESSAGE: 'newMessage',
  CONNECT: 'connect',
}

export const socket = io('', {
  autoConnect: false,
  timeout: 20000
})