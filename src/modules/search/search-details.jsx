import { React, useState, useContext, useEffect } from "react";
import SearchSection from "./search-section";
import SearchReasult from "./search-reasult";
import { DetailSection, getLocalStorageItem } from "shared/utils";
import { SectionCard } from "shared/components";
import { getSearchedResult } from "server/api/city-search";
import { MarketSegmentView } from "modules/market";
import { LoadingContext } from "store2/loading-context-provider";
import { getSpecificSearch } from "server/api/get-specific-search";
import SearchDraftedResult from "./search-drafted-result";

export const SearchDetails = ({ children, searchDetailsProps }) => {
  const { setCityNameList, setUsecaseList, setIsDataSearched } =
    searchDetailsProps;

  const { searchGetterSetter } = useContext(LoadingContext);
  const { setReceivedSearchResult, receivedSearchResult } = searchGetterSetter;

  const [tableActive, setTableActive] = useState(false);
  const [selectedCityList, setSelectedCityList] = useState([]);
  const [selectedUseCaseList, setSelectedUseCaseList] = useState([]);
  const [searchedReasult, setSearchedReasult] = useState([]);
  const [cityNameResultList, setCityNameResultList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [activeSearch, setActiveSearch] = useState(true);
  const [marketSegmentData, setMarketSegmentData] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState();
  const [userId, setUserId] = useState();
  const [savesearchId, setSaveSearchId] = useState();
  const handleSpecificSearchResponse = async (searchId, searchtype) => {
    //console.log("searchId111", searchId);
    if (searchId) {
      const payLoad = {
        saveSearchId: searchId,
        type: searchtype,
      };
      const response = await getSpecificSearch(payLoad);
      //console.log("response", response);
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
      //console.log("searchId1", savesearchId);
      handleSpecificSearchResponse(savesearchId, "USER");
    }
  }, [savesearchId]);

  useEffect(() => {
    if (receivedSearchResult) {
      //console.log("receivedSearchResult", receivedSearchResult);
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
    //console.log("location", location);
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
      //console.log("selectedCityList", selectedCityList);
      const cityNameList = selectedCityList.map(({ name }) => {
        return name;
      });

      const usecaseNameList = selectedUseCaseList.map(({ name }) => {
        return name;
      });

      setCityNameList(cityNameList.join(" / "));
      setUsecaseList(usecaseNameList.join(" / "));
      setIsDataSearched(true);
      setSearchedReasult(data);
      setReceivedSearchResult(false);
      setCityNameResultList(selectedCityList);
      setTableActive(true);
    }
  };
  const reinitializeSearcheSection = () => {
    setActiveSearch(false);
    setTimeout(() => {
      setActiveSearch(true);
    });
  };
  const handleClear = () => {
    setTableActive(false);
    setCityNameResultList([]);
    setSearchedReasult([]);
    setSelectedCityList([]);
    setCityList([]);
    setSearchCriteria();
    setIsDataSearched(false);
    reinitializeSearcheSection();
    console.log("handleClear");
  };
  // console.log("selectedUseCaseList", selectedUseCaseList);
  // console.log("selectedCityList", selectedCityList);
  const getAttributeValue = (e, attributeName) => {
    return e.target.getAttribute(attributeName);
  };
  const getCityIndex = (e) => {
    const indexValue = getAttributeValue(e, "indexid");
    //console.log("searchedReasult", searchedReasult);
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
      cluster_desc,
    });
  };
  const searchReasultProps = {
    cityNameResultList,
    searchedReasult,
    searchDetailsProps,
    getCityIndex,
  };
  const marketSegmentProps = {
    marketSegmentData,
    setMarketSegmentData,
  };

  return (
    <DetailSection>
      <SectionCard>
        {activeSearch ? (
          <SearchSection
            searchCriteria={searchCriteria}
            cityList={cityList}
            setCityList={setCityList}
            selectedCityList={selectedCityList}
            selectedUseCaseList={selectedUseCaseList}
            setSelectedCityList={setSelectedCityList}
            setSelectedUseCaseList={setSelectedUseCaseList}
            tableActive={tableActive}
            handleClear={handleClear}
            searchFunction={searchFunction}
          />
        ) : null}
      </SectionCard>
      {receivedSearchResult && userId && (
        <SearchDraftedResult setSaveSearchId={setSaveSearchId} />
      )}

      {tableActive && !receivedSearchResult ? (
        marketSegmentData ? (
          <MarketSegmentView props={marketSegmentProps} />
        ) : (
          <SearchReasult searchReasultProps={searchReasultProps} />
        )
      ) : null}
    </DetailSection>
  );
};
