import { Form, Button, Badge } from "react-bootstrap";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import {
  useGetMessagesQuery,
  useCreateMessageMutation,
} from "@/store/services/messages.service";

const ChatList = ({ channelId }) => {
    const { username } = useSelector((state) => state.auth);
  const { data: messages, error, isLoading, refetch } = useGetMessagesQuery();
  const [createMessage] = useCreateMessageMutation();

  const messageForm = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: async (values) => {
        try {
            await createMessage({ channelId, body: values.message, username }).unwrap();
            messageForm.resetForm();
            refetch();
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    },
  });

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
            <p className="p-2 bg-light border-bottom">
              Messages: <Badge>{messages?.length || 0}</Badge>
            </p>
            <ul
              className="list-unstyled px-2 overflow-auto"
              style={{ maxHeight: "500px" }}
            >
              {messages?.map((message) => (
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
        </>
      )}
    </>
  );
};

export default ChatList;
