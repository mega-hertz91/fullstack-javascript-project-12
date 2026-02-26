import { ButtonGroup, Button, Badge } from "react-bootstrap";

const Channels = (props) => {

    const { chanels, currentChanel, setChannel } = props;
  
    return (
      <>
        <p className="p-2 bg-light border-bottom">
          Channel: <Badge>#{currentChanel?.name}</Badge>
        </p>
        {chanels && (
          <ButtonGroup vertical className="w-100 px-3">
            {chanels.map((chanel) => (
              <Button
                variant={`${chanel.name === currentChanel?.name ? "primary" : "light"}`}
                key={chanel.id}
                onClick={() => setChannel(chanel)}
              >
                {chanel.name}
              </Button>
            ))}
          </ButtonGroup>
        )}
      </>
    );
}


export default Channels;