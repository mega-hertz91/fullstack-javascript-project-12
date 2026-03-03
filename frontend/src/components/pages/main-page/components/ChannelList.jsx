import {
  useCreateChanelMutation,
  useUpdateChannelMutation,
  useDeleteChannelMutation,
} from "@/store/services/channels.service";
import { isExistIetmInArray } from "@/utils/common.utils";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import ChannelItem from "./ChannelItem";
import { AppModal, ChannelModal } from "@/components/modals";
import { ButtonGroup, Badge, Button } from "react-bootstrap";

const Channels = (props) => {
  const { t } = useTranslation();
  const { chanels, currentChanel, setChannel, refetch } = props;

  // CRUD operations for channels.
  const [createChanel] = useCreateChanelMutation();
  const [updateChanel] = useUpdateChannelMutation();
  const [deleteChanel] = useDeleteChannelMutation();

  /**
   * Create channel handler
   * @param {Object} values // Values from Formik values
   * @param {Object} // FormikBag values
   */
  const createChannelHandler = async (values, { resetForm, setFieldError }) => {
    if (
      isExistIetmInArray(
        chanels.map(({ name }) => name),
        values.name,
      )
    ) {
      setFieldError("name", "Channel with this name already exists");
      throw new Error("Channel with this name already exists");
    }

    const { data } = await createChanel(values);

    refetch();
    resetForm();
    setChannel(data);
    toast.success(t('entities.channel') + ' ' + t('toast.createSuccess'));
  };

  /**
   * Delete channel handler
   * @param {Object} values // Values from Formik values
   * @param {Object} // FormikBag values
   */
  const deleteChannelHandler = async (values, { resetForm }) => {
    await deleteChanel(values);
    refetch();
    resetForm();
    setChannel(chanels.at(-2));
    toast.success(t('entities.channel') + ' ' + t('toast.deleteSuccess'));
  };

  /**
   * Update channel handler
   * @param {Object} values // Values from Formik values
   * @param {Object} // FormikBag values
   */
  const updateChannelHandler = async (values, { resetForm, setFieldError }) => {
    if (
      isExistIetmInArray(
        chanels
          .map(({ name }) => name)
          .filter((name) => name !== currentChanel?.name),
        values.name,
      )
    ) {
      setFieldError("name", "Channel with this name already exists");
      throw new Error("Channel with this name already exists");
    }

    await updateChanel(values);

    refetch();
    resetForm();
    setChannel(values);
    toast.success(t('toast.updateSuccess'));
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-baseline bg-light border-bottom">
        {/** Channels header **/}
        <p className="p-2 m-0">
          <Badge bg="dark">#{currentChanel?.name}</Badge>
        </p>
        <AppModal
          trigger={
            <Button
              variant="primary"
              size="sm"
              className="p-1 mx-2"
              style={{ lineHeight: "8px" }}
              aria-label={t('formAction.create') + ' ' + t('entities.channel').toLocaleLowerCase()}
              title={t('formAction.create') + ' ' + t('entities.channel').toLocaleLowerCase()}
            >
              +
            </Button>
          }
        >
          <ChannelModal actionText={t('formAction.create') + ' ' + t('entities.channel').toLocaleLowerCase()} onSubmit={createChannelHandler} />
        </AppModal>
      </div>
      {/** Channels list **/}
      {chanels && (
        <ButtonGroup vertical className="w-100">
          {chanels.map(({ name, id, removable }) => (
            <ChannelItem
              key={id}
              channel={{ name, id, removable }}
              isCurrentChannel={currentChanel?.id === id}
              setChannel={setChannel}
              onUpdateChannel={updateChannelHandler}
              onDeleteChannel={deleteChannelHandler}
            />
          ))}
        </ButtonGroup>
      )}
    </>
  );
};

export default Channels;
