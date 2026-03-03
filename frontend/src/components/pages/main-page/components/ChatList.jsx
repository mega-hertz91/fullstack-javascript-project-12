import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addAlert } from "@/store/reducres/alert.reducer";
import {
  useGetMessagesQuery,
  useCreateMessageMutation,
  useDeleteMessageMutation,
  useUpdateMessageMutation,
} from "@/store/services/messages.service";
import { createDangerAlert } from "@/utils/alert.util";
import { messageScheme } from "@/validation-schemes/";
import { isEqualString } from "@/utils/common.utils";


import ChatItem from "./ChatItem";
import { Form, Button, Badge, Spinner } from "react-bootstrap";

/**
 * MessageForm component for handling message input and submission. It uses Formik for form state management and validation. On submit, it sends the message to the server and resets the form.
 */
const MessageForm = ({ onSubmit, id = null, body = "test", setFormState }) => {
  const inputRef = useRef(null);
  /**
   * Formik form for handling message input and submission. On submit, it sends the message to the server and refetches the messages to update the chat list.
   */
  const messageForm = useFormik({
    initialValues: {
      body,
      id,
    },
    validationSchema: messageScheme,
    onSubmit: async (values, { resetForm }) => {
      await onSubmit(values);
      resetForm();
    },
  });

  /**
   * Reaction to changes in id and body props. When they change, it updates the form values accordingly. This is useful for editing messages, where the form needs to be populated with the existing message data when the user clicks "edit".
   */
  useEffect(() => {
    messageForm.setValues({ id, body });
    if (inputRef.current) {
      inputRef.current.focus();
    }
   }, [id, body]);

  return (
    <Form className="p-3 d-flex bg-light border-top" onSubmit={messageForm.handleSubmit}>
      <Form.Group className="w-100 position-relative">
        <Form.Control
          ref={inputRef}
          type="text"
          placeholder="Type your message..."
          name="body"
          value={messageForm.values.body}
          onChange={messageForm.handleChange}
          isInvalid={!!messageForm.errors.body && messageForm.touched.body}
          onBlur={() => setFormState({ id: null, body: "" })}
        />
        <Form.Control.Feedback
          type="invalid"
          className="position-absolute bottom-100"
        >
          {messageForm.errors.body}
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
const ChatList = ({ channelId, username, online }) => {
  const dispatch = useDispatch();
  const lastMesageRef = useRef(null);
  const [formState, setFormState] = useState({ id: null, body: "" });

  /**
   * RTK Query methods for fetching messages and creating new messages.
   */
  const { data: messages, error, isLoading, refetch } = useGetMessagesQuery();
  const [createMessage] = useCreateMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();
  const [updateMessage] = useUpdateMessageMutation();

  /**
   * Filter messages by channelId to display only messages relevant to the current channel. If there are no messages or the channelId is not set, it returns an empty array to avoid rendering issues.
   */
  const filteredMessages = messages?.filter((message) => message.channelId === channelId) || [];

  const onSubmitMessage = async ({id, ...values}) => {
    switch (id) {
      case null:
        await createMessageHandler(values);
        break;
      default: 
      await updateMessageHandler({ id, ...values });
    }

    refetch();
  };

  const createMessageHandler = async (values) => {
      try {
        await createMessage({
          channelId,
          username,
          ...values,
        }).unwrap();
        refetch();
      } catch (error) {
        dispatch(
          addAlert(
            createDangerAlert("Failed to send message: " + error.message),
          ),
        );
      }
  }

  const deleteMessageHandler = async (payload) => {
    try {
      await deleteMessage(payload).unwrap();
      refetch();
    } catch (error) {
      dispatch(
        addAlert(createDangerAlert("Failed to delete message: " + error.message)),
      );
    }
  };

  const updateMessageHandler = async (payload) => {
    try {      
      await updateMessage(payload).unwrap();
      refetch();
    } catch (error) {
      dispatch(
        addAlert(createDangerAlert("Failed to update message: " + error.message)),
      );
    }
  }

  useEffect(() => {
    if (lastMesageRef.current) {
      lastMesageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [channelId, messages]);

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
          <div className="flex-grow-1 d-flex flex-column">
            {/** Chatlist header */}
            <p className="p-2 bg-light border-bottom d-flex align-items-center justify-content-end">
              <Badge bg={online ? "success" : "secondary"} className="ms-auto">
                {online ? "Online" : "Offline"}
              </Badge>
            </p>
            {/** end Chatlist header */}

            {/** Messages list */}
            <ul
              className="list-unstyled px-2 overflow-auto"
              style={{ maxHeight: "500px" }}
            >
              {filteredMessages.map((message) => (
                <li
                  ref={
                    message.id === filteredMessages.at(-1)?.id
                      ? lastMesageRef
                      : null
                  }
                  key={message.id}
                  className={`d-flex flex-wrap mb-2 ${isEqualString(username, message.username) ? "justify-content-end" : "justify-content-start"}`}
                >
                  <ChatItem
                    {...message}
                    isMe={isEqualString(username, message.username)}
                    onDelete={deleteMessageHandler}
                    onUpdate={setFormState}
                  />
                </li>
              ))}
            </ul>
            {/** end Messages list */}

            {/** Message form */}
            <MessageForm {...formState} onSubmit={onSubmitMessage} setFormState={setFormState} />
            {/** end Message form */}
          </div>
        </>
      )}
    </>
  );
};

export default ChatList;
