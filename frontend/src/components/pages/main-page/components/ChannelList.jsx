import {
  useCreateChanelMutation,
  useUpdateChannelMutation,
  useDeleteChannelMutation,
} from '@/store/services/channels.service'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { isExistIetmInArray } from '@/utils/common.utils'

/**
 * Styles component
 */
import ChannelItem from './ChannelItem'
import { AppModal, ChannelModal } from '@/components/modals'
import { ButtonGroup, Badge, Button } from 'react-bootstrap'

const Channels = (props) => {
  const { t } = useTranslation()
  const { chanels, currentChanel, setChannel, refetch } = props

  // CRUD operations for channels.
  const [createChanel] = useCreateChanelMutation()
  const [updateChanel] = useUpdateChannelMutation()
  const [deleteChanel] = useDeleteChannelMutation()

  const afterSubmitHook = (formikBag, toastMessage, data = null) => {
    refetch()
    formikBag.resetForm()

    data ? setChannel(data) : setChannel(chanels.at(0))
    toast.success(toastMessage)
  }
  /**
   * Create channel handler
   * @param {Object} values // Values from Formik values
   * @param {Object} // FormikBag values
   */
  const createChannelHandler = async (values, formikBag) => {
    if (isExistIetmInArray(chanels.map(({ name }) => name), values.name)) {

      formikBag.setFieldError('name', t('error.hasBeenUnique'))
      throw new Error(t('error.hasBeenUnique'))
    }

    const { error, data } = await createChanel(values)

    if (error) {
      throw new TypeError(t('error.connectNetwork'))
    }

    afterSubmitHook(formikBag, t('toast.channelCreated'), data)
  }

  /**
   * Delete channel handler
   * @param {Object} values // Values from Formik values
   * @param {Object} // FormikBag values
   */
  const deleteChannelHandler = async (values, formikBag) => {
    const { error } = await deleteChanel(values)

    if (error) {
      throw new TypeError(t('error.connectNetwork'))
    }

    afterSubmitHook(formikBag, t('toast.channelDeleted'))
  }

  /**
   * Update channel handler
   * @param {Object} values // Values from Formik values
   * @param {Object} // FormikBag values
   */
  const updateChannelHandler = async (values, formikBag) => {
    if (
      isExistIetmInArray(
        chanels
          .map(({ name }) => name),
        values.name,
      )
    ) {
      formikBag.setFieldError('name', t('error.hasBeenUnique'))
      throw new Error(t('error.hasBeenUnique'))
    }

    const { error, data } = await updateChanel(values)

    if (error) {
      throw new TypeError(t('error.connectNetwork'))
    }

    afterSubmitHook(formikBag, t('toast.channelUpdated'), data)
  }

  // useEffect(() => {
  //   socket.connect();

  //   const handleRemoveChannel = ({ id }) => {
  //     setChannel(chanels.at(0));
  //     toast.info([username, t("entities.channel"), id, t("toast.channelDeleted")].join(" "));
  //   };

  //   socket.on(Event.REMOVE_CHANNEL, handleRemoveChannel);

  //   return () => {
  //     socket.off(Event.REMOVE_CHANNEL, handleRemoveChannel);
  //     socket.disconnect();
  //   };
  // }, [chanels]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-baseline bg-light border-bottom">
        {/** Channels header **/}
        <p className="p-2 m-0">
          <Badge bg="dark">
            #
            {currentChanel?.name}
          </Badge>
        </p>
        <AppModal
          trigger={
            <Button
              variant="primary"
              size="sm"
              className="p-1 mx-2"
              style={{ lineHeight: '8px' }}
              aria-label={t('formAction.create') + ' ' + t('entities.channel').toLocaleLowerCase()}
              title={t('formAction.create') + ' ' + t('entities.channel').toLocaleLowerCase()}
            >
              +
            </Button>
          }
        >
          <ChannelModal actionText={t('formAction.send')} onSubmit={createChannelHandler} />
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
              onUpdateChannel={(values, formikBag) => updateChannelHandler({ id, ...values }, formikBag)}
              onDeleteChannel={(values, formikBag) => deleteChannelHandler({ id, ...values }, formikBag)}
            />
          ))}
        </ButtonGroup>
      )}
    </>
  )
}

export default Channels
