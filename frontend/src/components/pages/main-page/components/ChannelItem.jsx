import { AppModal, ChannelModal } from "@/components/modals";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";

const ClassName = {
    CURRENT: 'primary',
    DEFAULT: 'light',
    SIZE: 'md'
}

const ChannelItem = ({ channel, isCurrentChannel, setChannel, onUpdateChannel, onDeleteChannel }) => {
  const { id, name, removable } = channel;

  return (
    <Dropdown
      as={ButtonGroup}
      key={id}
      className="d-flex justify-content-between"
    >
      <Button
        variant={isCurrentChannel ? ClassName.CURRENT : ClassName.DEFAULT}
        key={id}
        onClick={() => setChannel({ name, id })}
        size={ClassName.SIZE}
      >
        #{name}
      </Button>
      {removable && (
        <>
          <Dropdown.Toggle
            split
            variant={isCurrentChannel ? ClassName.CURRENT : ClassName.DEFAULT}
            id="dropdown-split-basic"
            size={ClassName.SIZE}
          />
          <Dropdown.Menu>
            <Dropdown.Item>
              <AppModal trigger={<span>edit</span>}>
                <ChannelModal
                  actionText="Edit"
                  onSubmit={(values, formikHelpers) =>
                    onUpdateChannel({ ...values, id }, formikHelpers)
                  }
                  name={name}
                />
              </AppModal>
            </Dropdown.Item>
            <Dropdown.Item>
              <AppModal trigger={<span>delete</span>}>
                <ChannelModal
                  disabled
                  actionText="Delete"
                  onSubmit={(values, formikHelpers) =>
                    onDeleteChannel({ ...values, id }, formikHelpers)
                  }
                  name={name}
                />
              </AppModal>
            </Dropdown.Item>
          </Dropdown.Menu>
        </>
      )}
    </Dropdown>
  );
};

export default ChannelItem;
