import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import { channelScheme } from "@/validation-schemes";
import { useTranslation } from "react-i18next";

/** 
 * View for creating new channel. Used in AppModal component
*/
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { initProfanity, leoProfanity } from "@/utils/profanity.util";

initProfanity(["ru", "en"]);

const ChannelModal = ({ onClose, onSubmit, actionText = 'Create', name = "", disabled = false }) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const createForm = useFormik({
    initialValues: {
      name,
    },
    validationSchema: channelScheme,
    onSubmit: async (values, formikBag) => {
      try {
        const isNotCorrect = leoProfanity.check(values.name);

        const data = {
          ...values,
          name: !isNotCorrect ? values.name : leoProfanity.clean(values.name),
        };

        await onSubmit(data, formikBag);
        // Autoclose modal on success
        if (onClose) {
          onClose();
        }
      }
      catch (error) {
        if (error.name === "TypeError") {
          toast.error(t("error.network"));
        }
        
        console.error(error);
        formikBag.setSubmitting(false);
      }
    },
  });

  // Set focus to input on modal open
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <Form onSubmit={createForm.handleSubmit} onClick={(e) => e.stopPropagation()}>
        <Modal.Header>
          <p className="fs-4 mb-0 fw-medium">{actionText}</p>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name" className="visually-hidden">{t('chatList.enterChannelName')}</Form.Label>
            <Form.Control
              ref={inputRef}
              disabled={disabled}
              id="name"
              name="name"
              type="text"
              placeholder={t('chatList.enterChannelName')}
              value={createForm.values.name}
              onChange={createForm.handleChange}
              isInvalid={!!createForm.errors.name}
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {createForm.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={onClose}
            type="reset"
            className="me-2"
          >
            {t('formAction.cancel')}
          </Button>
          <Button variant="primary" type="submit" disabled={createForm.isSubmitting}>
            {createForm.isSubmitting && (
              <Spinner animation="border" size="sm" className="me-2" />
            )}
            {actionText}
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
}

export default ChannelModal;