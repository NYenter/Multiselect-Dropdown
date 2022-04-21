import { useEffect, useState, useRef } from "react";
import { styled } from "goober";
import useGetColor from "../hooks/useGetColor";
import useHighlightMatching from "../hooks/useHighlightMatching";
import QueryResultContainer from "./queried results/QueryResultContainer";
import SelectedTags from "./tags/SelectedTags";
import { ReactComponent as Clear } from "../assets/close.svg";

const Select = () => {
  const [input, setInput] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [lastSelectedItem, setLastSelectedItem] = useState("");
  const [results, setResults] = useState([]);
  const [higlighteResults, setHighlightedResults] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isTextDisabled, setIsTextDisabled] = useState(false);
  const [reset, setReset] = useState(false);
  const { data, loading } = useGetColor({ query: input.toLowerCase() });
  const higlightedResult = useHighlightMatching(results, input);
  const tagRef = useRef();
  let clearFilteredItems = false;

  useEffect(() => {
    const filteredData = filterOutSelectedItems();
    setResults(filteredData);
  }, [data, selectedItems]);

  useEffect(() => {
    setIsDisabled(disableFields());
    setIsTextDisabled(disableText());
  }, [lastSelectedItem])

  const addItem = (item) => setSelectedItems([...selectedItems, item]);

  const removeItem = (itemToRemove) => {
    const filteredItems = selectedItems.filter((item) => item.name !== itemToRemove.name);
    setSelectedItems(filteredItems);
  }

  const filterOutSelectedItems = () => {
    const selected = new Set(selectedItems?.map((item) => item.name));
    const lastItem = [...selected][selected.size - 1];

    setLastSelectedItem(lastItem);
    return data?.filter((item) => !selected.has(item.name));
  }

  const disableFields = () => {
    const maxItemsSelected = selectedItems?.length < 3 ? false : true;
    return maxItemsSelected;
  }

  const disableText = () => {
    let wasPreviouslyDisabled = false;

    return (function () {
      if (disableFields()) {
        wasPreviouslyDisabled = true;
        return true;
      }

      const selectedNames = selectedItems.map((item) => item.name);
      const hasSelectedItem = selectedNames.includes(lastSelectedItem);

      if (wasPreviouslyDisabled) {
        const isCurrentlyDisabled = selectedItems.length < 3 && !hasSelectedItem ? false : true;

        if (isCurrentlyDisabled) return true;

        wasPreviouslyDisabled = false;
        return false;
      } else if (hasSelectedItem && disableFields()) {
        wasPreviouslyDisabled = true;
        return true;
      } else {
        return false;
      }
    }());
  };

  const clearAndReset = () => {
    clearFilteredItems = true;
    setResults([]);
    setInput("");
    setSelectedItems([]);
    setIsDisabled(false);
    setReset(true);

    //Waiting for state to reset
    setTimeout(() => {
      setReset(false);
    }, 1500);
    clearFilteredItems = false;
  }

  // Attempting to forward the ref to the Selected Tags
  // component to be able to cycle through the tags.
  // Currently the ref value is undefined.
  const focusOnTags = (e) => {
    if (e.key === 'Tab') {
      console.log(tagRef);
      return true;
    }
    return false;
  }

  const hasInput = input.length > 0;
  const hasSelectedItems = selectedItems.length > 0;

  return ( 
    <Wrapper>
      <SelectControl is_filled={hasInput.toString()}>
        <SelectedTags
          items={selectedItems}
          removeItem={removeItem}
          forwardRef={tagRef}
        />
        {!hasSelectedItems &&
          <SearchIcon >
            <SearchHandle />
          </SearchIcon>
        }
        <TextInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Select..."
          disabled={isTextDisabled}
          is_filled={hasInput.toString()}
          onKeyDown={focusOnTags}
        />
        {input.length > 0 &&
          <ClearContainer>
            <ClearInput onClick={() => clearAndReset()} />Î
          </ClearContainer>
        }
      </SelectControl>
      {!reset &&
        <QueryResultContainer
          results={results}
          loading={loading}
          addItem={addItem}
          isDisabled={isDisabled}
          clearFilteredItems={clearFilteredItems}
        />
      }
    </Wrapper>
  );
};

const Wrapper = styled("div")`
  margin: 0 auto;
  text-align: left;
  max-width: 600px;
`;

const SelectControl = styled("div")(({ is_filled }) => (`
  width: 100%;
  max-width: 600px;
  display: flex;
  flexDirection: row; 
  background-color: ${is_filled === "true" ? `var(--shade0)` : `var(--shade6)`};
  border-radius: var(--br-lg);
  position: relative;
  pointer-events: auto;

  &:hover {
    background-color: ${is_filled === "true" ? `var(--shade0)` : `var(--shade5)`};
  }

  &:focus-within {
    background-color: var(--shade0);
  }
  
`));

const TextInput = styled("input")(({ is_filled }) => (`
  line-height: 26px;
  width: 600px;
  max-width: 600px;
  height: 56px;
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  color: ${is_filled === "true" ? `var(--shade3)` : `var(--shade2)`};
  background-color: ${is_filled === "true" ? `var(--shade0)` : `var(--shade6)`};
  padding-left: 10px;
  border-radius: var(--br-lg);
  pointer-events: auto;

  &:hover {
    color: ${is_filled === "true" ? `var(--shade3)` : `var(--shade2)`};
    background-color: ${is_filled === "true" ? `var(--shade0)` : `var(--shade5)`};
  }
  &:focus {
    color: var(--shade1);
    background-color: var(--shade0);
    outline: none;
  }
  &:disabled {
    color: var(--shade3);
    background-color: var(--shade0);
  }
`
));

const ClearInput = styled(Clear)`
color: var(--shade2);
width: 15px;
height: 15px;
display: flex;
align-items: center;
position: absolute;
margin: 4px 0 0 48px;

  &:hover {
  color: var(--shade3);
  cursor: pointer;
  }
`;

const ClearContainer = styled("div")`
position: absolute;
display: flex;
flex-direction: row;
justify-content: flex-start;
width: 0px;
height: 0px;
left: 50px;
top: 18px;
margin: 0 0 0 460px;
color: transparent;

&:hover::before {
  content: "Clear";
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--shade3);
  outline: none;
}
`;

const SearchIcon = styled("div")`
width: 15px;
height: 15px;
border: 2.5px solid var(--shade3);
border-radius: 50%;
position: relative;
top: 20px;
left: 15px;
margin: 0 15px 0 0;
`
const SearchHandle = styled("div")`
width: 0px;
height: 6px;
border: 1.5px solid var(--shade3);
background-color: var(--shade3);
position: absolute;
top: 9px;
left: 10px;
margin: 0 15px 0 0;
border-bottom-left-radius: 5px;
border-bottom-right-radius: 5px;
transform: rotate(-40deg);
`



export default Select;
