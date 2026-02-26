import { Form, Button, Badge } from "react-bootstrap";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { addAlert } from "@/store/reducres/alert.reducer";
import {
  useGetMessagesQuery,
  useCreateMessageMutation,
} from "@/store/services/messages.service";
import {socket} from "@/socket";

/**
 * MessageForm component for handling message input and submission. It uses Formik for form state management and validation. On submit, it sends the message to the server and resets the form.
 */
const MessageForm = ({ onSubmit }) => {
  /**
   * Formik form for handling message input and submission. On submit, it sends the message to the server and refetches the messages to update the chat list.
   */
  const messageForm = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: async (values, { resetForm }) => {
      await onSubmit(values);
      resetForm();
    },
  });

  return (
    <Form className="p-3" onSubmit={messageForm.handleSubmit}>
      <Form.Group className="d-flex" controlId="messageInput">
        <Form.Control
          type="text"
          placeholder="Type your message..."
          name="message"
          value={messageForm.values.message}
          onChange={messageForm.handleChange}
        />
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form.Group>
    </Form>
  );
};

/**
 * ChatList component for displaying messages of the current channel. It fetches messages from the server and listens for new messages via WebSocket. Messages are filtered by channelId to show only relevant messages for the current channel.
 */
const ChatList = ({ channelId }) => {
  const { username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  /**
   * RTK Query methods for fetching messages and creating new messages.
   */
  const { data: messages, error, isLoading, refetch } = useGetMessagesQuery();
  const [createMessage, { error: errorCreateMessage }] = useCreateMessageMutation();

  /**
   * Filter messages by channelId to display only messages relevant to the current channel. If there are no messages or the channelId is not set, it returns an empty array to avoid rendering issues.
   */
  const filteredMessages = messages?.filter((message) => message.channelId === channelId) || [];

  const createMessageHandler = async (values) => {
    try {
      await createMessage({
        channelId,
        body: values.message,
        username,
      }).unwrap();
      refetch();
    } catch (error) {
      dispatch(
        addAlert({
          id: Date.now(),
          message: "Failed to send message: " + errorCreateMessage.error + " " + error.message,
          type: "danger",
          createdAt: new Date().toISOString(),
        }),
      );
      // TODO: add service for create alerts and use it here instead of dispatching action directly
    }
  };

  return (
    <>
      {error && (
        <p className="text-danger">
          Error loading messages: {error.toString()}
        </p>
      )}
      {isLoading && <p>Loading messages...</p>}
      {!isLoading && !error && (
        <>
          <div className="flex-grow-1">
            <p className="p-2 bg-light border-bottom d-flex align-items-center">
              Messages: <Badge>{filteredMessages.length}</Badge>
                <Badge bg={socket.connected ? "success" : "danger"} className="ms-auto">
                  {socket.connected
                    ? "(Live updates enabled)"
                    : "(Live updates disabled)"}
                </Badge>
            </p>
            <ul
              className="list-unstyled px-2 overflow-auto"
              style={{ maxHeight: "500px" }}
            >
              {filteredMessages.map((message) => (
                <li
                  key={message.id}
                  className={
                    username === message.username
                      ? "text-primary d-flex justify-content-start"
                      : "text-secondary d-flex justify-content-end"
                  }
                >
                  <strong>{message.username}:&nbsp;</strong> {message.body}
                </li>
              ))}
            </ul>
          </div>
          <MessageForm onSubmit={createMessageHandler} />
        </>
      )}
    </>
  );
};

export default ChatList;
