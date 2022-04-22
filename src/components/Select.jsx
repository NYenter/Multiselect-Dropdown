import { useEffect, useState } from "react";
import { styled } from "goober";
import useGetColor from "../hooks/useGetColor";
import useHighlightMatching from "../hooks/useHighlightMatching";
import QueryResultContainer from "./queried results/QueryResultContainer";
import SelectedTags from "./tags/SelectedTags";
import ErrorMessage from "./ErrorMessage";
import { ReactComponent as Clear } from "../assets/close.svg";

const Select = () => {
  const [input, setInput] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [lastSelectedItem, setLastSelectedItem] = useState("");
  const [results, setResults] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isTextDisabled, setIsTextDisabled] = useState(false);
  const [reset, setReset] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const { data, loading } = useGetColor({ query: input.toLowerCase() });
  let clearFilteredItems = false;

  useHighlightMatching(results, input);

  useEffect(() => {
    const filteredData = filterOutSelectedItems();
    setResults(filteredData);
  }, [data, selectedItems]);

  useEffect(() => {
    setIsDisabled(disableFields());
    setIsTextDisabled(disableText());
  }, [results, selectedItems])

  const addItem = (item) => setSelectedItems([...selectedItems, item]);

  const removeItem = (itemToRemove) => {
    const filteredItems = selectedItems.filter((item) => item.name !== itemToRemove.name);
    setSelectedItems(filteredItems);
  }

  const filterOutSelectedItems = () => {
    const selected = new Set(selectedItems?.map((item) => item.name));
    return data?.filter((item) => !selected.has(item.name));
  }

  const disableFields = () => {
    const maxItemsSelected = selectedItems?.length < 3 ? false : true;
    return maxItemsSelected;
  }

  const disableText = () => {
    const selectedNames = selectedItems.map((item) => item.name);

    if (selectedItems.length === 3) {
      setLastSelectedItem(selectedNames[selectedNames.length - 1]);
    }

    return (function () {
      if (isDisabled) return true;
      
      const hasSelectedItem = selectedNames.includes(lastSelectedItem);
      return hasSelectedItem && selectedItems.length > 0 ? true : false;
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

  const showErrorMessage = () => {
    if (!isDisabled) return;
    setErrorMessage(`A max of 3 items can be selected at once.`)
    setShowError(true);

    // Showing error for 3s then closing
    setTimeout(() => {
      setShowError(false);
    }, 3500)
  }

  const hasInput = input.length > 0;
  const hasSelectedItems = selectedItems.length > 0;

  return (
    <Wrapper>
      <SelectControl is_filled={hasInput.toString()}>
        <SelectedTags
          items={selectedItems}
          removeItem={removeItem}
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
        />
        {input.length > 0 &&
          <ClearContainer>
            <ClearInput onClick={() => clearAndReset()} />Î
          </ClearContainer>
        }
      </SelectControl>
      {showError &&
        <ErrorMessage message={errorMessage} />
      }
      {!reset &&
        <QueryResultContainer
          results={results}
          loading={loading}
          addItem={addItem}
          isDisabled={isDisabled}
          clearFilteredItems={clearFilteredItems}
          showErrorMessage={showErrorMessage}
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
