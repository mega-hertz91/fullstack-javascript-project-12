import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { messageScheme } from '@/validation-schemes/'
import { useTranslation } from 'react-i18next'
import { initProfanity, leoProfanity } from '@/utils/profanity.util'

import { Form, Button, Spinner, CloseButton, Fade } from 'react-bootstrap'

initProfanity(['ru', 'en'])

const MessageForm = ({ onSubmit, initialValues }) => {
  const { t } = useTranslation()
  const inputRef = useRef(null)
  /**
   * Formik form for handling message input and submission. On submit, it sends the message to the server and refetches the messages to update the chat list.
   */
  const messageForm = useFormik({
    initialValues,
    validationSchema: messageScheme,
    onSubmit: async (values, { resetForm }) => {
      const isNotCorrect = leoProfanity.check(values.body)

      const data = {
        ...values,
        body: !isNotCorrect ? values.body : leoProfanity.clean(values.body),
      }

      await onSubmit(data)
      resetForm()
    },
  })

  const onKeyEvent = e => {
    const { key } = e

    if (key === 'Enter' && messageForm.values.body) {
      e.preventDefault()
      messageForm.handleSubmit()
    }
  }

  /**
   * Reaction to changes in initialValues props. When they change, it updates the form values accordingly. This is useful for editing messages, where the form needs to be populated with the existing message data when the user clicks "edit".
   */
  return (
    <div className="p-3 bg-light border-top">
      <Form
        className="border-top position-relative d-flex align-items-stretch"
        onSubmit={messageForm.handleSubmit}
      >
        <Form.Group className="w-100">
          <Form.Control
            ref={inputRef}
            placeholder={t('chatList.typeYouMessage')}
            name="body"
            value={messageForm.values.body}
            onChange={messageForm.handleChange}
            isInvalid={!!messageForm.errors.body && messageForm.touched.body}
            onKeyDown={onKeyEvent}
            aria-label={t('chatList.newMessage')}
          />
          <Form.Control.Feedback
            type="invalid"
            className="position-absolute bottom-100"
          >
            {messageForm.errors.body}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>  
          <Button
            variant="primary"
            type="submit"
            className="ms-auto"
            disabled={messageForm.isSubmitting || !messageForm.isValid}
          >
            {messageForm.isSubmitting && (
              <Spinner
                animation="border"
                size="sm"
                className="me-2 mt-1 bg-transparent"
              />
            )}
            <span>{'>>'}</span>
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default MessageForm