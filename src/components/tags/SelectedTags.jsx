import React from "react";
import { styled } from "goober";
import Tag from "./Tag";

const SelectedTags = ({ items, removeItem }, ref) => {
  const reversedItemOrder = [...items]?.reverse();

  return (
    <TagContainer ref={ref}>
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

export default React.forwardRef(SelectedTags);