import Badge from "react-bootstrap/Badge";
import Alert from "react-bootstrap/Alert";
import Dropdown from "react-bootstrap/Dropdown";
import React from "react";
import { useTranslation } from "react-i18next";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => {
    return (
        <button 
        className="px-1 py-0 rounded-none lh-1 m-0 border-0 bg-transparent text-dark" 
        ref={ref} 
        onClick={(e) => {
            e.preventDefault();
             onClick(e);
        }}>
            ...
            { children }
        </button>
    )
})

const ChatItem = ({ username, body, removable, isMe, onDelete, onUpdate }) => {
  const { t } = useTranslation();

  return (
    <>
      <Alert variant={isMe ? "success" : "light"} className="p-0 w-75 m-0">
        <div className="d-flex align-items-end mb-0 w-100 px-2 pt-1">
          {isMe && removable && (
            <Dropdown className="me-auto">
              <Dropdown.Toggle id="dropdown-basic" as={CustomToggle} />

              <Dropdown.Menu>
                <Dropdown.Item onClick={onUpdate}>
                  {t("formAction.edit")}
                </Dropdown.Item>
                <Dropdown.Item onClick={onDelete}>
                  {t("formAction.delete")}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
          <Badge bg={isMe ? "success" : "dark"}>
            {isMe ? t("chatList.you") : username}
          </Badge>
        </div>
        <span className="fw-light d-block p-2">{body}</span>
      </Alert>
    </>
  );
};

export default ChatItem;