import { useState, useEffect } from "react";
import { styled, keyframes } from "goober";
import SearchingBar from "./SearchingBar";
import ResultNotFound from "./ResultNotFound";

const SearchResultContainer = ({
  results,
  loading,
  addItem,
  isDisabled,
  clearFilteredItems,
  showErrorMessage,
}) => {
  const [items, setFilteredItems] = useState([]);

  useEffect(() => {
    setFilteredItems(results);
  }, [results])

  useEffect(() => {
    if (clearFilteredItems) {
      setFilteredItems([]);
    }
  }, [clearFilteredItems]);

  const filterOutSelectedItems = (item) => {
    if (isDisabled) {
      showErrorMessage();
      return;
    }

    const filteredItems = items?.filter((staticItem) => staticItem.name !== item.name);

    setFilteredItems(filteredItems);
    addItem(item);
  }

  const showResults = !loading && items?.length > 0;
  const showResultsNotFound = !loading && items?.length === 0;

  return (
    <>
      {loading && <SearchingBar />}
      {showResults &&
        <ResultContainer>
          {items.map((item) => {
            return (
              <ResultItem
                key={item.name}
                item_color={item.hex}
                onClick={() => filterOutSelectedItems(item)}
              >
                {item.name.split(/| /).map((letter, idx) => {
                  return (
                    <CustomLetters
                      is_in_query={`${item?.queriedLetters[idx]}`}
                      text_color={item.hex}
                      key={idx}
                    >
                      {letter}
                    </CustomLetters>
                  )
                })}
              </ResultItem>
            )
          })}
        </ResultContainer>
      }
      {showResultsNotFound && <ResultNotFound />}
    </>
  )
};

const ResultContainer = styled("div")`
  background-color: var(--shade0);
  max-width: 600px;
  width: 100%;
  margin-top: 10px;
  border-radius: var(--br-lg);
  padding: 4px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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

const ResultItem = styled("div")(({ item_color }) => (
  `
  color: var(--white);
  background-color: ${item_color};
  width: 584px;
  height: 36px;
  border-radius: var(--br-md);
  border: 5px solid ${item_color};
  margin: 4px 8px;
  font-size: 14px;
  font-weight: 600;
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
  `
));

const CustomLetters = styled("span")([
  ({ is_in_query, text_color }) => (
    {
      backgroundColor: is_in_query === "true" && "yellow",
      color: is_in_query === "true" && text_color,
    }),
]);


export default SearchResultContainer;