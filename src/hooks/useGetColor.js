import { useEffect, useState } from "react";
import { useDebounce } from '../hooks/useDebounce';

const mockData = [
  { name: "Red", hex: "#DB2D2D" },
  { name: "Orange", hex: "#F2994A" },
  { name: "Yellow", hex: "#F2C94C" },
  { name: "Green", hex: "#27AE60" },
  { name: "Blue", hex: "#2F80ED" },
  { name: "Violet", hex: "#602FED" },
  { name: "Rebecca Purple", hex: "#663399" },
  { name: "git push", hex: "#db7093"},
  { name: "Git Plus: Push", hex: "#8b4513" }
];

// This function can be improved. for example, fuzzy search
const mockDatabaseResponse = (query) => {
  const data = [...mockData];
  const result = [];
  const cleanseInput = query.replaceAll(" ", "");
  const input = cleanseInput.split("");

  for (const item of data) {
    const hasMatch = fuzzySearch(input, item);

    if (hasMatch) {
      result.push(item);
    }
  }

  return result;
};

const fuzzySearch = (input, item) => {
  const lowerCaseName = item.name.toLowerCase();
  let inputIdx = 0;
  let nameIdx = 0;

  while (nameIdx < lowerCaseName.length) {
    //Found all input characters, return early.
    if (inputIdx >= input.length) {
      return true;
    }

    if (input[inputIdx] === lowerCaseName[nameIdx]) {
      inputIdx++;
    } 
    nameIdx++;
  }

  //Catches last character since it won't loop again
  const result = inputIdx >= input.length ? true : false;
  return result;
}

// Emulates a slow API call, don't change this
const queryPromise = (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDatabaseResponse(query));
    }, 500);
  });
};

// This hook can be modified for cache, debounce, etc.
const useGetColor = ({ query = "" }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cache, setCache] = useState(new Map());
  const debounceQueryValue = useDebounce(query, 500);

  useEffect(() => {
    setLoading(true);
    if (!debounceQueryValue.length) {
      setData(null);
      setLoading(false);
      return;
    }

    if (cache.has(debounceQueryValue)) {
      setData(cache.get(debounceQueryValue));
      setLoading(false);
    } else {
      queryPromise(debounceQueryValue).then((response) => {
        const sortedResult = response?.sort((a, b) => a.name.localeCompare(b.name));
        setData([...sortedResult]);
        setCache(cache.set(debounceQueryValue, sortedResult))
        setLoading(false);
      });
    }
  }, [debounceQueryValue]);

  return {
    data,
    loading,
  };
};

export default useGetColor;
