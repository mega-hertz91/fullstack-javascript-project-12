import { cloneElement, useState, Children } from 'react'
import { Modal, Button } from 'react-bootstrap'

const Simple = ({ trigger, children, triggerProps, triggerText }) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      {trigger
        ? (
          <div onClick={handleShow}>{trigger}</div>
        )
        : (
          <Button {...triggerProps} onClick={(e) => handleShow(e)}>
            {triggerText || 'Launch demo modal'}
          </Button>
        )}

      <Modal show={show} onHide={handleClose}>
        {Children.map(children, (child) => cloneElement(child, { onClose: handleClose }))}
      </Modal>
    </>
  )
}

export default Simple
