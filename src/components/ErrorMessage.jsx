import { styled, keyframes } from "goober"

const ErrorMessage = ({ message = "" }) => (
  <MessageContainer>
    {message}
  </MessageContainer>
)


const showError = keyframes
  `
  0% {
    opacity: 50%;
    transform: scale(.8);
  }
  10% {
    opacity: 100%;
    transform: scale(1);
  }
  80% {
    opacity: 100%;
    transform: scale(1);
  }
  100% {
    opacity: 0%;
    transform: scale(.8);
  }
`;

const MessageContainer = styled("div")`
width: 600px;
height: 36px;
color: var(--primary);
display: flex;
justify-content: center;
align-items: center;
font-size: 14px;
font-weight: 600;
animation: ${showError};
animation-duration: 3.7s;
animation-iteration-count: 1;
animation-timing-function: ease-in-out;
`;

export default ErrorMessage;