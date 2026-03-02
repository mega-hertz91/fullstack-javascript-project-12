import { Form, Button, Badge, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addAlert } from "@/store/reducres/alert.reducer";
import {
  useGetMessagesQuery,
  useCreateMessageMutation,
} from "@/store/services/messages.service";
import { socket } from "@/socket";
import { createDangerAlert } from "@/utils/alert.util";
import { messageScheme } from "@/validation-schemes/";

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
    validationSchema: messageScheme,
    onSubmit: async (values, { resetForm }) => {
      await onSubmit(values);
      resetForm();
    },
  });

  return (
    <Form className="p-3 d-flex" onSubmit={messageForm.handleSubmit}>
      <Form.Group className="w-100 position-relative">
        <Form.Control
          type="text"
          placeholder="Type your message..."
          name="message"
          value={messageForm.values.message}
          onChange={messageForm.handleChange}
          isInvalid={
            !!messageForm.errors.message && messageForm.touched.message
          }
        />
        <Form.Control.Feedback
          type="invalid"
          className="position-absolute bottom-100"
        >
          {messageForm.errors.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="d-flex align-items-center">
        <Button
          variant="primary"
          type="submit"
          className="d-flex"
          disabled={messageForm.isSubmitting || !messageForm.isValid}
        >
          {messageForm.isSubmitting && (
            <Spinner
              animation="border"
              size="sm"
              className="me-2 mt-1 bg-transparent"
            />
          )}
          <span>Send</span>
        </Button>
      </Form.Group>
    </Form>
  );
};

/**
 * ChatList component for displaying messages of the current channel. It fetches messages from the server and listens for new messages via WebSocket. Messages are filtered by channelId to show only relevant messages for the current channel.
 */
const ChatList = ({ channelId, username }) => {
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
        addAlert(createDangerAlert("Failed to send message: " + errorCreateMessage.error + " " + error.message)),
      );
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
