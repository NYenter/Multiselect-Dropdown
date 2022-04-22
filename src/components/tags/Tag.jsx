import { styled, keyframes } from "goober";
import { ReactComponent as Close } from "../../assets/close.svg";

const Tag = ({ item, removeItem }) => (
    <TagItem
      item_color={item.hex}
      onClick={() => removeItem(item)}
      tabIndex={0}
    >
      <Text>
        {item.name}
      </Text>
      <CloseBtn
        color={item.hex}
        onClick={() => removeItem(item)}
      />
    </TagItem>
  )

const keyFrameLoading = keyframes
  `
  from {
    opacity: 0%;
    transform: scale(.8);
  }
  to {
    opacity: 100%;
    transform: scale(1);
  }
`;

const onRemove = keyframes
  `
  from {
    opacity: 100%;
    transform: scale(1);
  }
  to {
    opacity: 0%;
    transform: scale(.8);
  }
`;

const TagItem = styled("div")(({ item_color }) => (
  `
    display: flex;
    flex-direction: row;
    align-items: center;
    height: git-content;
    width: fit-content;
    background-color: ${item_color};
    border-radius: var(--br-md);
    margin-left: 10px;
    padding: 6px;
    font-size: 15px;
    animation: ${keyFrameLoading};
    animation-duration: .3s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;

    &:hover {
      box-shadow: 0px 0px 1px 3px ${item_color}44;
    }

    &:active {
      animation: ${onRemove};
      animation-duration: .3s;
      animation-iteration-count: 1;
      animation-timing-function: ease-out;
    }

    &:focus {
      transform: scale(1.1);
      box-shadow: 0px 0px 1px 3px ${item_color}44;
      outline: 0;
    }
  `
));

const Text = styled("p")
  `
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter: -0.9%;
  color: var(--white);
  padding-right: 8px;
`;

const CloseBtn = styled(Close)(({ color }) => (
  `
    color: ${color};
    background-color: #ffffffaa;
    padding: 3px;
    height: 15px;
    width: 15px;
    border-radius: 50%;

    &:hover {
      background-color: var(--white);
      cursor: pointer;
    }
  `
));

export default Tag;