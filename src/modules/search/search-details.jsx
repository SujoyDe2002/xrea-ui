import { React, useState, useContext, useEffect } from "react";
import SearchSection from "./search-section";
import SearchReasult from "./search-reasult";
import {
  ArrangeSearchData,
  DetailSection,
  getLocalStorageItem,
  updateLocalStorage,
} from "shared/utils";
import { getSearchedResult } from "server/api/city-search";
import { MarketSegmentView } from "modules/market";
import { LoadingContext } from "store2/loading-context-provider";
import { getSpecificSearch } from "server/api/get-specific-search";
import SearchDraftedResult from "./search-drafted-result";
import { XreaTable } from "shared/utils/data-table/xrea-table";

export const SearchDetails = ({ children, searchDetailsProps }) => {
  const { setCityNameList, setUsecaseList, setIsDataSearched } =
    searchDetailsProps;

  const { searchTitleGetterSetter, searchGetterSetter, handleClear } = useContext(LoadingContext);
  const { setReceivedSearchResult, receivedSearchResult } = searchGetterSetter;

  const [tableActive, setTableActive] = useState(false);
  const [selectedCityList, setSelectedCityList] = useState([]);
  const [selectedUseCaseList, setSelectedUseCaseList] = useState([]);
  const [searchedReasult, setSearchedReasult] = useState();
  const [cityNameResultList, setCityNameResultList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [activeSearch, setActiveSearch] = useState(true);
  const [marketSegmentData, setMarketSegmentData] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState();
  const [userId, setUserId] = useState();
  const [savesearchId, setSaveSearchId] = useState();
  const [curentSearchTitle, setCurentSearchTitle] = useState();
  let [xreaTableRows, setXreaTableRows] = useState([])
  const [xreSearchDisable, setXreSearchDisable] = useState(false);
  const [xreaSeachButtonTitle, setXreSearchButtonTitle] = useState(
    "Save this XREA Search"
  );

  const handleSpecificSearchResponse = async (searchId, searchtype) => {
    if (searchId) {
      const payLoad = {
        saveSearchId: searchId,
        type: searchtype,
      };
      const response = await getSpecificSearch(payLoad);
      setSearchCriteria(response);
    }
  };
  useEffect(() => {
    if (getLocalStorageItem("xrea")) {
      const { userId } = getLocalStorageItem("xrea")?.data?.loginData;
      setUserId(userId);
    }
    if (children?.searchId) {
      handleSpecificSearchResponse(children?.searchId, "GUEST");
    }
    if (savesearchId) {
      handleSpecificSearchResponse(savesearchId, "USER");
    }
    return () => {
      setSaveSearchId();
    }
  }, [savesearchId]);

  useEffect(() => {
    //console.log("receivedSearchResult", receivedSearchResult);
    if (receivedSearchResult) {
      handleClear();
    }
  }, [receivedSearchResult]);

  const searchFunction = async () => {
    let location = selectedCityList.map((city) => {
      return {
        geo_id: city?.id,
        geographic_area_name: city?.name,
      };
    });
    let useCase = selectedUseCaseList.map((element) => {
      return {
        use_case_group: element.code,
      };
    });

    const payLoad = {
      location,
      usecase: useCase,
    };
    const { data } = await getSearchedResult(payLoad);
    if (data) {
      const cityNameList = selectedCityList.map(({ name }) => {
        return name;
      });

      const usecaseNameList = selectedUseCaseList.map(({ name }) => {
        return name;
      });

      setCityNameList(cityNameList.join(" / "));
      setUsecaseList(usecaseNameList.join(" / "));
      setIsDataSearched(true);
      // setSearchTitle();
      setSearchedReasult(data);

      const { general_stat, usecase, marketSegment } = data;

      //console.log("searchedReasult", searchedReasult)
      setReceivedSearchResult(false);
      setCityNameResultList(selectedCityList);

      const searchResultRowData = ArrangeSearchData({
        CityData: [selectedCityList],
        GeneralStat: [general_stat],
        UseCases: [usecase],
        MarketSegmentData: [marketSegment.data]
      })
      //console.log("searchResultRowData", searchResultRowData);
      //console.log("usecase", usecase);
      setXreaTableRows(searchResultRowData)
      setTableActive(true);
    }
  };
  const reinitializeSearcheSection = () => {
    setActiveSearch(false);
    setTimeout(() => {
      setActiveSearch(true);
    });
  };

  const getAttributeValue = (e, attributeName) => {
    return e.target.getAttribute(attributeName);
  };
  const getCityIndex = (e) => {
    const indexValue = getAttributeValue(e, "indexid");
    const selectedResultRow = searchedReasult.general_stat.data[indexValue];
    const selectedMarketSegmentRow =
      searchedReasult.marketSegment.data[indexValue];
    const { tenYearPopGrowthRate, medianIncome, homePToIncome } =
      selectedResultRow;
    const { clusterName, cluster_desc } = selectedMarketSegmentRow;
    const cityName = cityNameResultList[indexValue].name;
    setMarketSegmentData({
      cityName,
      tenYearPopGrowthRate,
      medianIncome,
      homePToIncome,
      clusterName,
      cluster_desc
    });
  };
  const searchReasultProps = {
    cityNameResultList,
    searchedReasult,
    searchDetailsProps,
    selectedUseCaseList,
    curentSearchTitle,
    xreaTableRows,
    setCurentSearchTitle,
    getCityIndex,
    xreSearchDisable,
    setXreSearchDisable,
    xreaSeachButtonTitle,
    setXreSearchButtonTitle,
    setSearchCriteria
  };
  const marketSegmentProps = {
    marketSegmentData,
    setMarketSegmentData
  };

  return (
    <DetailSection>
      {activeSearch ? (
        <SearchSection
          searchCriteria={searchCriteria}
          curentSearchTitle={curentSearchTitle}
          cityList={cityList}
          setCityList={setCityList}
          selectedCityList={selectedCityList}
          selectedUseCaseList={selectedUseCaseList}
          setSelectedCityList={setSelectedCityList}
          setSelectedUseCaseList={setSelectedUseCaseList}
          tableActive={tableActive}
          handleClear={handleClear}
          searchFunction={searchFunction}
          setXreSearchDisable={setXreSearchDisable}
          xreaSeachButtonTitle={xreaSeachButtonTitle}
        />
      ) : null}

      {receivedSearchResult && userId && (
        <SearchDraftedResult setSaveSearchId={setSaveSearchId} />
      )}

  
    </DetailSection>
  );
};
