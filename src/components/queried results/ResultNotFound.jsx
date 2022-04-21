import { styled } from "goober";

const ResultNotFound = ({ message = "No Results" }) => (
  <NotFoundContainer>
    {message}
  </NotFoundContainer>
)

const NotFoundContainer = styled("div")`
background-color: var(--shade0);
max-width: 600px;
width: 100%;
height: 40px;
margin-top: var(--sp-2);
border-radius: var(--br-lg);
display: flex;
align-items: center;
justify-content: center;
color: var(--shade2);
font-size: 14px;
font-weight: 600px;
`;

export default ResultNotFound;