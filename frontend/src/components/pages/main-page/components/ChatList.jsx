import { useEffect, useMemo, useRef, useState } from 'react'
import {
  useGetMessagesQuery,
  useCreateMessageMutation,
  useUpdateMessageMutation,
} from '@/store/services/messages.service'
import { createArrayOfLength } from '@/utils/common.utils'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { MessageForm } from '@/components/forms'
import { Badge, Alert, Placeholder } from 'react-bootstrap'

/**
 * ChatList component for displaying messages of the current channel. It fetches messages from the server and listens for new messages via WebSocket. Messages are filtered by channelId to show only relevant messages for the current channel.
 */
const ChatList = ({ channelId, username, online, currentChanel }) => {
  const { t } = useTranslation()
  const lastMesageRef = useRef(null)
  const [formState, setFormState] = useState({ id: null, body: '' })

  /**
   * RTK Query methods for fetching messages and creating new messages.
   */
  const { data: messages, error, isLoading, refetch } = useGetMessagesQuery()
  const [createMessage] = useCreateMessageMutation()
  const [updateMessage] = useUpdateMessageMutation()

  /**
   * Filter messages by channelId to display only messages relevant to the current channel. If there are no messages or the channelId is not set, it returns an empty array to avoid rendering issues.
   */
  const filteredMessages = useMemo(
    () => messages?.filter(message => message.channelId === channelId) || [],
    [messages, channelId],
  )

  const afterSendHook = toastMessage => {
    setFormState({ id: null, body: '' })
    refetch()

    if (toastMessage) {
      toast.success(toastMessage)
    }
  }

  const onSubmitMessage = async ({id, ...values}) => {
    switch (id) {
      case null:
        await createMessageHandler({channelId, username, ...values})
        break
      default: 
        await updateMessageHandler({ id, ...values })
    }
  }

  const createMessageHandler = async values => {
    const { error } = await createMessage(values)

    if (error) {
      toast.error(t('entities.message') + ' ' + t('toast.createFailed') + ': ' + error?.message)
    }

    afterSendHook()
  }

  const updateMessageHandler = async values => {
    const { error } = await updateMessage(values)

    if (error) {
      toast.error(t('entities.message') + ' ' + t('toast.updateFailed') + ': ' + error?.message)
    }

    afterSendHook(t('entities.message') + ' ' + t('toast.updateSuccess'))
  }

  useEffect(() => {
    if (lastMesageRef.current) {
      lastMesageRef.current.scrollIntoView()
    }
  }, [filteredMessages])

  return (
    <>
      {error && (
        <Alert variant="danger">
          <Alert.Heading>Connection error</Alert.Heading>
          Error loading messages: {error.error}
        </Alert>
      )}
      <div className="h-100 d-flex flex-column">
        {/** Chatlist header */}
        <div className="p-2 bg-light border-bottom d-flex align-items-center justify-content-end">
          <p className="me-auto m-0 p-0"># {currentChanel?.name}</p>
          <p>{filteredMessages.length} {t('chatList.messageCount')}</p>
          <Badge bg={online ? 'success' : 'secondary'} className="ms-auto">
            {online ? t('chatList.online') : t('chatList.offline')}
          </Badge>
        </div>
        {/** end Chatlist header */}

        {/** Messages list */}
        <div
          id="messages-box"
          className="list-unstyled px-2 overflow-y-auto flex-grow-1"
          style={{ height: '60vh' }}
        >
          {isLoading && (
            <>
              {createArrayOfLength(6).map(index => (
                <div
                  className={`w-full mb-2 w-75 ${index % 2 ? 'me-auto' : 'ms-auto'}`}
                  key={index}
                >
                  <Placeholder as="span" animation="glow">
                    <Placeholder.Button
                      sm={12}
                      className="w-full py-4"
                      variant="secondary"
                    />
                  </Placeholder>
                </div>
              ))}
            </>
          )}
          {!isLoading && !error && filteredMessages.length !== 0 && (
            <>
              {filteredMessages.map(message => (
                <div
                  ref={message.id === filteredMessages.at(-1)?.id ? lastMesageRef : null}
                  key={message.id}
                  className="text-break mb-2"
                >
                  <b>{message.username}</b>: {message.body}
                </div>
              ))}
            </>
          )}
        </div>
        {/** end Messages list */}

        {/** Message form */}
        <MessageForm
          initialValues={formState}
          onSubmit={onSubmitMessage}
          resetValues={() => setFormState({ id: null, body: '' })}
        />
        {/** end Message form */}
      </div>
    </>
  )
}

export default ChatList
