import { useState } from"react";
import { useGetChanelsQuery } from "@/store/services/channels.service";

/**
 * Global component for main page. It contains channels list and chat content
 */
import BaseLayout from "@/components/layout";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

/**
 * Local component for channels list
 */
import { ChannelList, ChatList } from "./components";

const Page = () => {
  const [currentChanel, setChannel] = useState(null);
  const { data: chanels, error, isLoading } = useGetChanelsQuery();

  // Init default channel
  if (chanels && !currentChanel) {
    setChannel(chanels.at(0));
  }

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
              lg={3}
              className="border rounded-3 h-100 overflow-scroll p-0 mr-2"
            >
              <ChannelList
                chanels={chanels}
                currentChanel={currentChanel}
                setChannel={setChannel}
              />
            </Col>
            <Col
              lg={9}
              className="border rounded-3 h-100 overflow-scroll flex-column d-flex p-0 ml-2"
            >
              <ChatList channelId={currentChanel?.id} />
            </Col>
          </Row>
        </Container>
      )}
    </BaseLayout>
  );
};

export default Page;
