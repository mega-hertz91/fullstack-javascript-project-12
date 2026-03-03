import { useEffect, useState } from"react";
import { useSelector } from "react-redux";
import { useGetChanelsQuery } from "@/store/services/channels.service";
import { socket, Event } from "@/socket";

/**
 * Global component for main page. It contains channels list and chat content
 */
import BaseLayout from "@/components/layout";
import { Container, Row, Col, Alert, Placeholder, Button, ButtonGroup } from "react-bootstrap";

/**
 * Local component for channels list
 */
import { ChannelList, ChatList } from "./components";

const Page = () => {
  const { username } = useSelector((state) => state.auth);
  const [currentChanel, setChannel] = useState(null);
  const [online, setOnline] = useState(false);
  const { data: chanels, error, isLoading, refetch } = useGetChanelsQuery();

  // Init default channel
  if (chanels && !currentChanel) {
    setChannel(chanels.at(0));
  }

  useEffect(() => {
    socket.connect();

    const handleConnetction = () => {
      setOnline(true);
    };

    socket.on(Event.CONNECT, handleConnetction);

    return () => {
      setOnline(false);
      socket.off(Event.CONNECT, handleConnetction);
      socket.disconnect(); 
    };
  }, []);

  return (
    <BaseLayout>
      {error && (
        <Alert variant="danger">
          <Alert.Heading>Connection error</Alert.Heading>
          Error loading channels: {error.error}
        </Alert>
      )}
      <Row className="h-100">
        <Col
          sm={3}
          xl={2}
          className="border rounded-3 overflow-hidden p-0 mr-2"
        >
          {isLoading && (
            <>
              <p className="p-2 bg-light border-bottom d-flex align-items-center justify-content-end mb-0">
                <Placeholder as="span" animation="glow">
                  <Placeholder sm={12} />
                </Placeholder>
              </p>
              <Placeholder
                as={ButtonGroup}
                vertical
                className="w-100 bg-transparent"
                animation="glow"
                variant="secondary"
              >
                <Placeholder as={Button} sm={12} bg="primary" />
                <Placeholder as={Button} sm={12} bg="secondary" />
                <Placeholder as={Button} sm={12} bg="secondary" />
              </Placeholder>
            </>
          )}
          {!isLoading && !error && (
            <ChannelList
              chanels={chanels}
              currentChanel={currentChanel}
              setChannel={setChannel}
              refetch={refetch}
              username={username}
            />
          )}
        </Col>
        <Col
          sm={9}
          xl={10}
          className="border rounded-3 overflow-hidden flex-column d-flex p-0 ml-2"
        >
          {!isLoading && !error && (
            <ChatList
              online={online}
              channelId={currentChanel?.id}
              username={username}
            />
          )}
        </Col>
      </Row>
    </BaseLayout>
  );
};

export default Page;
