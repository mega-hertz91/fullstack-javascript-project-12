import { AppModal, ChannelModal } from '@/components/modals'
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const ClassName = {
  CURRENT: 'primary',
  DEFAULT: 'light',
  SIZE: 'md',
}

const ChannelItem = ({ channel, isCurrentChannel, setChannel, onUpdateChannel, onDeleteChannel }) => {
  const { t } = useTranslation()
  const { id, name, removable } = channel

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
        <span># </span>
        {name}
      </Button>
      {removable && (
        <>
          <Dropdown.Toggle
            split
            variant={isCurrentChannel ? ClassName.CURRENT : ClassName.DEFAULT}
            id="dropdown-split-basic"
            size={ClassName.SIZE}
          >
            <span className="visually-hidden">{t('chatList.channelOptions')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <AppModal trigger={<span>{t('formAction.edit')}</span>}>
                <ChannelModal
                  actionText={t('formAction.send')}
                  onSubmit={onUpdateChannel}
                  name={name}
                />
              </AppModal>
            </Dropdown.Item>
            <Dropdown.Item>
              <AppModal trigger={<span>{t('formAction.delete')}</span>}>
                <ChannelModal
                  deleted
                  actionText={t('formAction.delete')}
                  onSubmit={onDeleteChannel}
                  name={name}
                />
              </AppModal>
            </Dropdown.Item>
          </Dropdown.Menu>
        </>
      )}
    </Dropdown>
  )
}

export default ChannelItem
