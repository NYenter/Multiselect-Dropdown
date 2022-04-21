import { styled, keyframes } from "goober"
import spinner from "../../assets/spinner.svg"

const LoadingSpinner = () => <Spinner src={spinner}/>

const spin = keyframes`
from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const Spinner = styled("img")`
  animation: ${spin} 1s linear infinite;
`;

export default LoadingSpinner;