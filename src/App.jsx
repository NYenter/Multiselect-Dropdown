import Select from "./components/Select";
import { styled } from "goober";

function App() {
  return (
    <Wrapper>
      <Select />
    </Wrapper>
  );
}

const Wrapper = styled("div")`
  margin: 0;
  box-sizing: border-box;
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  code: {
    font-family: source-code-pro, monospace;
  }
`;

export default App;
