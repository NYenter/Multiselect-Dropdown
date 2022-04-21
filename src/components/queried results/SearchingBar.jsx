import { styled } from "goober";
import LoadingSpinner from "../loading/LoadingSpinner";

// Component can be interchanged with LoadingSpinner
// if you want to follow the Figma design.
// import LoadingDots from "./loading/LoadingDots";

const SearchingBar = () => (
  <SearchingBarContainer>
    <LoadingSpinner />
  </SearchingBarContainer>
)

const SearchingBarContainer = styled("div")`
background-color: var(--shade0);
max-width: 600px;
width: 100%;
height: 40px;
margin-top: var(--sp-2);
border-radius: var(--br-lg);
display: flex;
align-items: center;
justify-content: center;
`;

export default SearchingBar;