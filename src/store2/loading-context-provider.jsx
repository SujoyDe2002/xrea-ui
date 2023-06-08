import React, { useState, useEffect, createContext } from "react";
import { timeout } from "shared/constants/attachment-extention";
import CircularIndeterminate from "shared/utils/loader/circularIndeterminate";
import ResponseMessage from "shared/utils/response-message/response-message";
export const LoadingContext = createContext();

const LoadingContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [user, setUser] = useState(null);
  // todo change to redux
  const [receivedSearchResult, setReceivedSearchResult] = useState(true);
  const [searchTitle, setSearchTitle] = useState();
  const [xreSearchDisable, setXreSearchDisable] = useState(true);
  const [searchCriteria, setSearchCriteria] = useState();
  const [curentSearchTitle, setCurentSearchTitle] = useState();
  const [cityList, setCityList] = useState([]);
  const [selectedCityList, setSelectedCityList] = useState([]);
  const [selectedUseCaseList, setSelectedUseCaseList] = useState([]);
  const [cityNameList, setCityNameList] = useState(null);
  const [cityNameResultList, setCityNameResultList] = useState([]);
  const [useCaseNameList, setUseCaseNameList] = useState([]);
  const [searchedReasult, setSearchedReasult] = useState();
  const [hasResult, setHasResult] = useState();
  let [xreaTableRows, setXreaTableRows] = useState([])
  const [savesearchId, setSaveSearchId] = useState();
  const [marketSegmentData, setMarketSegmentData] = useState();
  const [xreaSeachButtonTitle, setXreSearchButtonTitle] = useState(
    "Save this XREA Search"
  );

  const startLoader = () => {
    setLoading(true);
    setResponseMessage(null);
  };
  const stopLoader = () => {
    setLoading(false);
  };
  const handleResponseMessage = (message) => {
    //console.log("handleResponseMessage", message);
    setResponseMessage(message);
    setTimeout(() => {
      setResponseMessage(null);
    }, timeout);
  };
  const loaderFunction = {
    startLoader,
    stopLoader,
  };
  const searchGetterSetter = {
    receivedSearchResult,
    setReceivedSearchResult,
  };
  const userGetterSetter = {
    user,
    setUser,
  };
  const searchTitleGetterSetter = {
    searchTitle,
    setSearchTitle
  }
  useEffect(() => {
    console.log("searchedReasult1111", searchedReasult);
    if (!searchedReasult) {
      setHasResult(false)
      
    } else {
      setHasResult(true)
    }
    console.log("hasResult", hasResult);
  }, [searchedReasult])

  return (
    <LoadingContext.Provider
      value={{
        loaderFunction,
        handleResponseMessage,
        searchGetterSetter,
        userGetterSetter,
        searchTitleGetterSetter,
        searchCriteria,
        setSearchCriteria,
        curentSearchTitle,
        cityList,
        setCityList,
        useCaseNameList,
        setUseCaseNameList,
        selectedCityList,
        selectedUseCaseList,
        setSelectedCityList,
        setSelectedUseCaseList,
        xreSearchDisable,
        setXreSearchDisable,
        searchedReasult,
        setSearchedReasult,
        cityNameList,
        setCityNameList,
        setXreaTableRows,
        xreaTableRows,
        xreaSeachButtonTitle,
        setXreSearchButtonTitle,
        cityNameResultList,
        setCityNameResultList,
        savesearchId,
        setSaveSearchId,
        marketSegmentData,
        hasResult,
        setMarketSegmentData
      }}
    >
      {loading && <CircularIndeterminate />}
      {responseMessage && <ResponseMessage message={responseMessage} />}
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContextProvider;
