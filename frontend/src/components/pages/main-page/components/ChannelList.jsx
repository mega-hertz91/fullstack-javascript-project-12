import { useFormik } from "formik";
import { FormModal } from "@/components/modals";
import { useCreateChanelMutation } from "@/store/services/channels.service";
import { ButtonGroup, Badge, Button, Spinner, Dropdown, DropdownButton, SplitButton } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const CreateChannelForm = ({ onSubmit, onClose, onReset }) => {
  const createForm = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async (values, formikBag) => {
      await onSubmit(values, formikBag);
      if (onClose) {
        onClose();
      }
    },
  });

  return (
    <Form onSubmit={createForm.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          id="name"
          name="name"
          type="text"
          placeholder="Enter channel name"
          value={createForm.values.name}
          onChange={createForm.handleChange}
        />
      </Form.Group>
      <hr className="bg-light" style={{ margin: "16px -16px" }} />
      <Form.Group className="d-flex justify-content-end">
        <Button variant="outline-secondary" onClick={onReset} type="reset" className="me-2">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {createForm.isSubmitting && <Spinner animation="border" size="sm" className="me-2" />}
          Create
        </Button>
      </Form.Group>
    </Form>
  );
}

const Channels = (props) => {
  const { chanels, currentChanel, setChannel } = props;
  const [createChanel] = useCreateChanelMutation();

  const modalSuccessHandler = async (values, { resetForm }) => {
    await createChanel(values);
    resetForm();
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-baseline mb-4 bg-light border-bottom">
        <p className="p-2 m-0">
          <Badge>#{currentChanel?.name}</Badge>
        </p>
        <FormModal
          trigger={
            <Button
              variant="primary"
              size="sm"
              className="p-1 mx-2"
              style={{ lineHeight: "8px" }}
              aria-label="Add new channel"
              title="Add new channel"
            >
              +
            </Button>
          }
          title="Create new channel"
          body={<CreateChannelForm onSubmit={modalSuccessHandler} />}
        />
      </div>
      {chanels && (
        <ButtonGroup vertical className="w-100 px-3">
          {chanels.map(({ name, id, removable }) =>
            !removable ? (
              <Button
                variant={`${name === currentChanel?.name ? "primary" : "light"}`}
                key={id}
                onClick={() => setChannel({ name, id })}
              >
                #{name}
              </Button>
            ) : (
              <SplitButton
                as={ButtonGroup}
                variant={`${name === currentChanel?.name ? "primary" : "light"}`}
                key={`down-${id}`}
                onClick={() => setChannel({ name, id })}
                title={`#${name}`}
                drop="right"
              >
                <Dropdown.Item eventKey="1">Edit</Dropdown.Item>
                <Dropdown.Item eventKey="2">Delete</Dropdown.Item>
              </SplitButton>
            ),
          )}
        </ButtonGroup>
      )}
    </>
  );
}


export default Channels;