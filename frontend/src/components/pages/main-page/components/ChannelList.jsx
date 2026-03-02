import { AppModal, ChannelModal } from "@/components/modals";
import {
  useCreateChanelMutation,
  useUpdateChannelMutation,
  useDeleteChannelMutation,
} from "@/store/services/channels.service";
import { ButtonGroup, Badge, Button, Dropdown } from "react-bootstrap";

// TODO: Refactor to separate list and item components
const checkAlreadyExists = (chanels, name) => chanels.map(({ name }) => name).includes(name);

const Channels = (props) => {
  const { chanels, currentChanel, setChannel, refetch } = props;
  const [createChanel] = useCreateChanelMutation();
  const [updateChanel] = useUpdateChannelMutation();
  const [deleteChanel] = useDeleteChannelMutation();

  const createChannelHandler = async (values, { resetForm, setFieldError }) => {
    if (checkAlreadyExists(chanels, values.name)) {
      setFieldError("name", "Channel with this name already exists");
      throw new Error("Channel with this name already exists");
    }

    const { data } = await createChanel(values);
    resetForm();
    refetch();

    setChannel(data);
  }

  const deleteChannelHandler = async (values, { resetForm }) => {
    await deleteChanel(values);
    resetForm();
    refetch();

    setChannel(chanels.at(-2))
  }

  const updateChannelHandler = async (values, { resetForm, setFieldError}) => {
    if (checkAlreadyExists(chanels.filter((chanel) => chanel.name !== currentChanel?.name), values.name)) {
      setFieldError("name", "Channel with this name already exists");
      throw new Error("Channel with this name already exists");
    }

    await updateChanel(values);
    resetForm();
    refetch();

    // Update current channel if it's the one being edited
    setChannel(values);
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-baseline mb-4 bg-light border-bottom">
        <p className="p-2 m-0">
          <Badge>#{currentChanel?.name}</Badge>
        </p>
        <AppModal
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
        >
          <ChannelModal actionText="Create" onSubmit={createChannelHandler} />
        </AppModal>
      </div>
      {/** TODO: destructure to list and item components **/}
      {chanels && (
        <ButtonGroup vertical className="w-100 px-3">
          {chanels.map(({ name, id, removable }) => (
            <>
              <Dropdown
                as={ButtonGroup}
                key={id}
                className="d-flex justify-content-between"
              >
                <Button
                  variant={`${id === currentChanel?.id ? "primary" : "light"}`}
                  key={id}
                  onClick={() => setChannel({ name, id })}
                >
                  #{name}
                </Button>
                {removable && (
                  <>
                    <Dropdown.Toggle
                      split
                      variant={`${id === currentChanel?.id ? "primary" : "light"}`}
                      id="dropdown-split-basic"
                    />
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <AppModal
                          trigger={<span>edit</span>}
                        >
                          <ChannelModal
                            actionText="Edit"
                            onSubmit={(values, formikHelpers) => updateChannelHandler({ ...values, id }, formikHelpers)}
                            name={name}
                          />
                        </AppModal>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <AppModal
                          trigger={<span>delete</span>}
                        >
                          <ChannelModal
                            disabled
                            actionText="Delete"
                            onSubmit={(values, formikHelpers) => deleteChannelHandler({ ...values, id }, formikHelpers)}
                            name={name}
                          />
                        </AppModal>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </>
                )}
              </Dropdown>
            </>
          ))}
        </ButtonGroup>
      )}
    </>
  );
}


export default Channels;