import { styled } from "goober";
import Tag from "./Tag";

const SelectedTags = ({ items, removeItem }) => {
  const reversedItemOrder = [...items]?.reverse();

  return (
    <TagContainer>
      {reversedItemOrder?.map((item) => (
        <Tag
          key={item.name}
          item={item}
          removeItem={removeItem}
        />
      ))}
    </TagContainer>
  )
}

const TagContainer = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default SelectedTags;