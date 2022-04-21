import { styled, keyframes } from "goober";

const LoadingDots = () => {
  return (
    <>
      <LoadingDot delay={0} />
      <LoadingDot delay={0.15} />
      <LoadingDot delay={0.3} />
    </>
  );
}

const LoadingDot = styled("div")(({ delay }) => (
  `
    width: 4px;
    height: 4px;
    margin: 0 1px;
    border-radius: 50%;
    animation: ${keyFrameLoading};
    animation-duration: .8s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    background-color: var(--shade3);
    display: flex;
    align-items: center;
    justify-content: center;
    animation-delay: ${delay}s;
  `
));

const keyFrameLoading = keyframes`
  50% {
    opacity: 0;
    transform: scale(0.5) translateY(3px);
  }
`;

export default LoadingDots;