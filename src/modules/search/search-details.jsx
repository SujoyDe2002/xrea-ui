import { React, useState, useContext, useEffect } from "react";
import SearchSection from "./search-section";
import {
  ArrangeSearchData,
  DetailSection,
  getLocalStorageItem
} from "shared/utils";
import { LoadingContext } from "store2/loading-context-provider";
import { getSpecificSearch } from "server/api/get-specific-search";
import SearchDraftedResult from "./search-drafted-result";

export const SearchDetails = ({ children, searchDetailsProps }) => {
  const { setCityNameList, setUsecaseList, setIsDataSearched } =
    searchDetailsProps;

  const { searchGetterSetter, handleClear } = useContext(LoadingContext);
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
    const data = {
      "usecase": {
        "data": [
          {
            "geo_id": "1600000US0473000",
            "OR_O": {
              "index": "71.0",
              "percentile": "13",
              "grade": "C-"
            },
            "OR_BV": {
              "index": "75.0",
              "percentile": "38",
              "grade": "C"
            },
            "OR_MA": {
              "index": "70.0",
              "percentile": "27",
              "grade": "C-"
            },
            "OR_CWYK": {
              "index": "70.0",
              "percentile": "10",
              "grade": "C-"
            },
            "OR_R": {
              "index": "61.7",
              "percentile": "2",
              "grade": "D-"
            },
            "OR_YP": {
              "index": "70.0",
              "percentile": "15",
              "grade": "C-"
            },
            "max": "OR_BV"
          },
          {
            "geo_id": "1600000US1205462",
            "OR_O": {
              "index": "75.8",
              "percentile": "58",
              "grade": "C"
            },
            "OR_BV": {
              "index": "81.7",
              "percentile": "72",
              "grade": "B-"
            },
            "OR_MA": {
              "index": "91.0",
              "percentile": "93",
              "grade": "A-"
            },
            "OR_CWYK": {
              "index": "81.9",
              "percentile": "76",
              "grade": "B-"
            },
            "OR_R": {
              "index": "73.4",
              "percentile": "70",
              "grade": "C"
            },
            "OR_YP": {
              "index": "85.5",
              "percentile": "83",
              "grade": "B"
            },
            "max": "OR_MA"
          }
        ],
        "label": [
          {
            "use_case_group": "OR_O",
            "use_case_group_desc": "Overall Residential",
            "use_case_color": "#467F7B",
            "priority_label": 1
          },
          {
            "use_case_group": "OR_MA",
            "use_case_group_desc": "Most Affordable",
            "use_case_color": "#877555",
            "priority_label": 3
          },
          {
            "use_case_group": "OR_BV",
            "use_case_group_desc": "Best Value",
            "use_case_color": "#AB5A8A",
            "priority_label": 4
          },
          {
            "use_case_group": "OR_R",
            "use_case_group_desc": "Retirees",
            "use_case_color": "#8166D6",
            "priority_label": 5
          },
          {
            "use_case_group": "OR_CWYK",
            "use_case_group_desc": "Couples with Young Kids",
            "use_case_color": "#8190BB",
            "priority_label": 6
          },
          {
            "use_case_group": "OR_YP",
            "use_case_group_desc": "Young Professionals",
            "use_case_color": "#00479D",
            "priority_label": 7
          }
        ]
      },
      "general_stat": {
        "data": [
          {
            "geo_id": "1600000US0473000",
            "tenYearPopGrowthRate": "16.73%",
            "homePToIncome": "4.7",
            "medianIncome": "$61.3k"
          },
          {
            "geo_id": "1600000US1205462",
            "tenYearPopGrowthRate": "13.13%",
            "homePToIncome": "2.2",
            "medianIncome": "$54.9k"
          }
        ]
      },
      "marketSegment": {
        "data": [
          {
            "geo_id": "1600000US0473000",
            "clusterName": "Moderate Segment",
            "cluster_desc": "The market segment provides moderate to average value for real-estate investment across the entire user base -- for young professionals, couples with children, and senior citizens alike!\n\nYoung Professionals: 3-star / \nCouple with Young Kids: 3-star / \nRetirees: 3-star / \nBest Value: 3-star\n"
          },
          {
            "geo_id": "1600000US1205462",
            "clusterName": "Star-studded Segment!",
            "cluster_desc": "The market segment that rocks! Provides wonderful overall real-estate experience across the board -- for young professionals, couples with children, and senior citizens alike! True one-size-fits-all!\n\nYoung Professionals: 5-star / \nCouple with Young Kids: 5-star / \nRetirees: 5-star / \nBest Value: 5-star"
          }
        ]
      }
    }
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
      setSearchedReasult(data);
      const { general_stat, usecase, marketSegment } = data;
      setReceivedSearchResult(false);
      setCityNameResultList(selectedCityList);
      const searchResultRowData = ArrangeSearchData({
        CityData: [selectedCityList],
        GeneralStat: [general_stat],
        UseCases: [usecase],
        MarketSegmentData: [marketSegment.data]
      })
      setXreaTableRows(searchResultRowData)
      setTableActive(true);
    }
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
