import { useEffect, useState } from"react";
import { useSelector, useDispatch } from "react-redux";
import { useGetChanelsQuery } from "@/store/services/channels.service";
import { addAlert } from "@/store/reducres/alert.reducer";
import { socket } from "@/socket";

/**
 * Global component for main page. It contains channels list and chat content
 */
import BaseLayout from "@/components/layout";
import { Container, Row, Col } from "react-bootstrap";

/**
 * Local component for channels list
 */
import { ChannelList, ChatList } from "./components";
import { createInfoAlert } from "@/utils/alert.util";

const Page = () => {
  const dispatch = useDispatch();

  const { username } = useSelector((state) => state.auth);
  const [currentChanel, setChannel] = useState(null);
  const { data: chanels, error, isLoading, refetch } = useGetChanelsQuery();

  // Init default channel
  if (chanels && !currentChanel) {
    setChannel(chanels.at(0));
  }

  useEffect(() => {
    const handleUpdateChannels = () => {
      setChannel(chanels.at(0));
      // TODO: add chat name to alert
      dispatch(addAlert(createInfoAlert("Channels list updated")));
    };

    socket.on("removeChannel", handleUpdateChannels);

    return () => {
      socket.off("removeChannel", handleUpdateChannels);
    };
  }, [chanels, dispatch]);

  return (
    <BaseLayout>
      {error && (
        <p className="text-danger">
          Error loading channels: {error.toString()}
        </p>
      )}
      {isLoading && <p>Loading channels...</p>}
      {!isLoading && !error && (
        <Container className="py-5 h-100">
          <Row className="h-100">
            <Col
              sm={12}
              md={3}
              xl={2}
              className="border rounded-3 h-100 overflow-hidden p-0 mr-2"
            >
              <ChannelList
                chanels={chanels}
                currentChanel={currentChanel}
                setChannel={setChannel}
                refetch={refetch}
                username={username}
              />
            </Col>
            <Col
              sm={12}
              md={9}
              xl={10}
              className="border rounded-3 h-100 overflow-hidden flex-column d-flex p-0 ml-2"
            >
              <ChatList channelId={currentChanel?.id} username={username} />
            </Col>
          </Row>
        </Container>
      )}
    </BaseLayout>
  );
};

export default Page;
