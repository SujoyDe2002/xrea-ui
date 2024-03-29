import React, { useState, useEffect, createContext } from "react";
import { useHistory } from "react-router-dom";
import { getSearchedResult } from "server/api/city-search";
import { getSpecificSearch } from "server/api/get-specific-search";
import { timeout } from "shared/constants/attachment-extention";
import { ArrangeSearchData, updateLocalStorage } from "shared/utils";
import ChangeObjPropertyName from "shared/utils/associate/change-object-property-name";
import CircularIndeterminate from "shared/utils/loader/circularIndeterminate";
import ResponseMessage from "shared/utils/response-message/response-message";
export const LoadingContext = createContext();



const getSearchedElement = (array, id) => {
  return array.find(({ geo_id }) => {
    return geo_id === id
  })
}
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
  const [tableActive, setTableActive] = useState(false);

  const [IsFirstRender, setIsFirstRender] = useState(false);
  const startLoader = () => {
    setLoading(true);
    setResponseMessage(null);
  };
  const stopLoader = () => {
    setLoading(false);
  };
  const handleResponseMessage = (message) => {

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

  const history = useHistory();
  const navigate = (path) => {
    history.push(path)
  }
  const handleSpecificSearchResponse = async (searchId, searchtype) => {
    setIsFirstRender(true);

    if (searchId) {
      const payLoad = {
        saveSearchId: searchId,
        type: searchtype,
      };
      let response = await getSpecificSearch(payLoad);
      const useCase = response.useCase.map((element) => {
        const properTyNames = [
          {
            oldProperty: "use_case_id",
            newProperty: "id"
          },
          {
            oldProperty: "use_case_group_desc",
            newProperty: "name"
          },
          {
            oldProperty: "use_case_color",
            newProperty: "color"
          }
        ]
        return ChangeObjPropertyName(element, properTyNames)
      })
      setSelectedCityList(response.city)
      setSelectedUseCaseList(useCase)
      setSearchCriteria(response);
      // searchFunction()

    }
  };
  const handleClear = () => {
    setCityNameResultList([]);
    setSearchedReasult();
    setSelectedCityList([]);
    setSelectedUseCaseList([]);
    setCityList([]);
    setSearchCriteria();
    setXreaTableRows([]);
    setSearchTitle();
    updateLocalStorage("xrea", { isdisabled: false })
  };
  useEffect(() => {
    if (IsFirstRender) {
      setIsFirstRender(false);
      searchFunction();
    }
  }, [searchCriteria, selectedUseCaseList])

  const searchFunction = async () => {

    let location = selectedCityList.map((city) => {
      return {
        geo_id: city?.id,
        geographic_area_name: city?.name,
      };
    });

    let useCase = selectedUseCaseList.map((element) => {
      if (element.code) {

        return {
          use_case_group: element.code
        };
      } else {
        return element
      }
    });
    const payLoad = {
      location,
      usecase: useCase
    };
    const data = await getSearchedResult(payLoad);
    if (data) {

      const cityNameList = selectedCityList.map(({ name }) => {
        return name;
      });

      const usecaseNameList = selectedUseCaseList.map(({ name }) => {
        return name;
      });
      setCityNameList(cityNameList.join(" , "));
      setUseCaseNameList(usecaseNameList.join(" , "));
      setSearchedReasult(data);
      history.push("/search_result")
      const { general_stat, usecase, marketSegment } = data;
      let arrangedUsecase = { data: [], label: usecase.label };
      let arrangedMarketSegment = { data: [] };
      let arrangedGeneral_stat = { data: [] };

      selectedCityList.map(({ id }) => {
        arrangedUsecase.data = [...arrangedUsecase.data, getSearchedElement(usecase.data, id)]
        arrangedMarketSegment.data = [...arrangedMarketSegment.data, getSearchedElement(marketSegment.data, id)]
        arrangedGeneral_stat.data = [...arrangedGeneral_stat.data, getSearchedElement(general_stat.data, id)]
      }, marketSegment.data, usecase.data, general_stat.data)

      setCityNameResultList(selectedCityList);
      const searchResultRowData = ArrangeSearchData({
        CityData: [selectedCityList],
        GeneralStat: [arrangedGeneral_stat],
        UseCases: [arrangedUsecase],
        MarketSegmentData: [arrangedMarketSegment.data]
      })
      setXreaTableRows(searchResultRowData)
    }
  }

  useEffect(() => {
    if (!searchedReasult) {
      setHasResult(false)

    } else {
      setHasResult(true)
    }
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
        searchFunction,
        handleSpecificSearchResponse,
        handleClear,
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
