import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Headings";
import Row from "./ui/Row";

const StyledApp = styled.div`
  padding: 20px;
`;
function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type="horizontal">
            <Heading as="h1">The wild oasis</Heading>
            <div>
              <Heading as="h2">Checkin and Check out</Heading>
              <Button onClick={() => alert("check in")}>Check in</Button>
              <Button
                variation="secondary"
                size="small"
                onClick={() => alert("check out")}
              >
                Check out
              </Button>
            </div>
          </Row>
          <Row>
            <Heading as="h3">form</Heading>
            <form>
              <Input type="text" placeholder="Number of guests" />
              <Input type="text" placeholder="Number of guests" />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
