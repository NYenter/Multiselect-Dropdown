import { useState, useEffect } from "react"

const useHighlightMatching = (data, query) => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    if(data === undefined) return;

    const highlightedResults = assignHighlightedLetters(data, query);
    setResult(highlightedResults);
  }, [data]);

  return result;
}

const assignHighlightedLetters = (data, query) => {
  const tempResult = [];

  for (const item of data) {
    const cleanseInput = query.replaceAll(" ", "");
    const input = cleanseInput.toLowerCase().split("");

    tempResult.push(highlightLetters(input, item));
  }

  return tempResult;
}

const highlightLetters = (input, item) => {
  const lowerCaseName = item.name.toLowerCase();
  const highlightedPosition = [];
  let inputIdx = 0;
  let nameIdx = 0;

  while (nameIdx < lowerCaseName.length) {
    //Found all input characters, return early.
    if (inputIdx >= input.length) {
      item.queriedLetters = highlightedPosition;
      return item;
    }

    if (input[inputIdx] === lowerCaseName[nameIdx]) {
      highlightedPosition[nameIdx] = true;
      inputIdx++;
    } else {
      highlightedPosition[nameIdx] = false;
    }

    nameIdx++;
  }

  //Catches last character since it won't loop again
  item.queriedLetters = highlightedPosition;
  return item;
}

export default useHighlightMatching;