import React, { useEffect, useState } from "react";

const useDebounce = (value, ms) => {
  const [DebounceValue, setDebounceValue] = useState("");

  useEffect(() => {
    const setTimeOutId = setTimeout(() => {
      setDebounceValue(value);
    }, ms);
    return () => {
      clearTimeout(setTimeOutId);
    };
  }, [value, ms]);
  return DebounceValue;
};

export default useDebounce;
