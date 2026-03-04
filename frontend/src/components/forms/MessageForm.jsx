import { useEffect, useRef } from "react";
import { useFormik } from "formik";
import { messageScheme } from "@/validation-schemes/";
import { useTranslation } from "react-i18next";

import { Form, Button, Spinner, CloseButton, Fade } from "react-bootstrap";

const MessageForm = ({ onSubmit, initialValues, resetValues }) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  /**
   * Formik form for handling message input and submission. On submit, it sends the message to the server and refetches the messages to update the chat list.
   */
  const messageForm = useFormik({
    initialValues,
    validationSchema: messageScheme,
    onSubmit: async (values, { resetForm }) => {
      await onSubmit(values);
      resetForm();
    },
  });

  const onKeyEvent = (e) => {
    const { key } = e;

    if (key === "Enter" && messageForm.values.body) {
      e.preventDefault();
      messageForm.handleSubmit();
    }

    if (key === "Escape") {
      e.preventDefault();
      resetValues();
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    messageForm.setValues(initialValues);
  }, [initialValues]);

  /**
   * Reaction to changes in initialValues props. When they change, it updates the form values accordingly. This is useful for editing messages, where the form needs to be populated with the existing message data when the user clicks "edit".
   */
  return (
    <div className="p-3 bg-light border-top">
      <Form
        className="border-top position-relative"
        onSubmit={messageForm.handleSubmit}
      >
        <Form.Group className="w-100">
          <Form.Control
            ref={inputRef}
            as="textarea"
            placeholder={t('chatList.typeYouMessage')}
            name="body"
            value={messageForm.values.body}
            onChange={messageForm.handleChange}
            isInvalid={!!messageForm.errors.body && messageForm.touched.body}
            onKeyDown={onKeyEvent}
          />
          <Form.Control.Feedback
            type="invalid"
            className="position-absolute bottom-100"
          >
            {messageForm.errors.body}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="position-absolute bottom-0 end-0 d-flex flex-column align-items-center">
          <Fade in={!!messageForm.values.body || !!messageForm.values.id}>
            <CloseButton
              onClick={messageForm.resetForm}
              className={`${messageForm.values.body || messageForm.values.id ? "visible" : "invisible"}`}
            />
          </Fade>
          <Button
            variant="primary"
            type="submit"
            className="ms-auto"
            disabled={messageForm.isSubmitting || !messageForm.isValid}
            size="sm"
          >
            {messageForm.isSubmitting && (
              <Spinner
                animation="border"
                size="sm"
                className="me-2 mt-1 bg-transparent"
              />
            )}
            <span>{">>"}</span>
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default MessageForm;