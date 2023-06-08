import { Grid } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { React, useState, useEffect, useContext } from "react";
import {
  ArrangeSearchData,
  AutoCompleteSelect,
  getLocalStorageItem,
  updateLocalStorage,
} from "shared/utils";
import {
  AppStyle,
  clearLinkStyle,
  disable,
  disableStyle,
  searchButtonContainer,
  searchButtonStyle,
  searchContainter,
} from "app";
import { getCityList } from "server/api/get-citylist";
import { getUseCaseList } from "server/api/get-usecase-list";
import Button1 from "shared/utils/button/button1";
import { LoadingContext } from "store2/loading-context-provider";
import { SectionCard } from "shared/components";
import { getSearchedResult } from "server/api/city-search";
import { useHistory, useLocation } from "react-router-dom";
import { getSpecificSearch } from "server/api/get-specific-search";
import isLogin from "shared/utils/associate/is-login";

const SearchSection = () => {
  const {
    searchTitleGetterSetter,
    userGetterSetter,
    searchCriteria,
    tableActive,
    setCityList,
    cityList,
    selectedUseCaseList,
    selectedCityList,
    // searchFunction,
    setSelectedCityList,
    setSelectedUseCaseList,
    setCityNameList,
    // setUseCaseList,
    searchedReasult,
    setSearchedReasult,
    setCityNameResultList,
    setXreSearchDisable,
    xreaSeachButtonTitle,
    setXreaTableRows,
    setSearchCriteria,
    savesearchId,
    hasResult,
    setSaveSearchId,
    setUseCaseNameList
  } = useContext(LoadingContext);
  const { searchTitle, setSearchTitle } = searchTitleGetterSetter;
  const { user } = userGetterSetter;

  const [useCaseList, setUseCaseList] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [savedCityList, setSavedCityList] = useState([]);
  const [savedUseCaseList, setSavedUseCaseList] = useState([]);
  const [autocompleteEnabled, setAutocompleteEnabled] = useState();
  const [userId, setUserId] = useState();

  const location = useLocation();
  const { id } = location?.state || {};
  
  const SearchCriteria = {
    searchId: id,
  };
  const history = useHistory();
  const navigate = (path) => {
    history.push(path)
  }


  useEffect(() => {
    
    
    // if (getLocalStorageItem("xrea")) {
    //   const { userId } = getLocalStorageItem("xrea")?.data?.loginData;
    //   // setUserId(userId);
    // }
    if (SearchCriteria?.searchId) {
      handleSpecificSearchResponse(SearchCriteria?.searchId, "GUEST");
    }
    if (savesearchId) {
      //
      handleSpecificSearchResponse(savesearchId, "USER");
    }
    return () => {
      setSaveSearchId();
    }
  }, [savesearchId]);
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const { data } = await getUseCaseList();
      if (isMounted) setUseCaseList(data);
      if (searchCriteria?.city) {
        setSelectedCityList(searchCriteria?.city);
        setSavedCityList(searchCriteria?.city);
        if (searchCriteria?.useCase) {
          setSelectedUseCaseList(searchCriteria.useCase);
          setSavedUseCaseList(searchCriteria.useCase);
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [searchCriteria]);

  useEffect(() => {
    //  

    if (searchCriteria?.city && selectedCityList?.length > 0) {
      updateLocalStorage("xrea", { isdisabled: true })
      // if (!searchTitle) {
      //   setDisabled(true);
      // } else {
      //   setDisabled(false);

      // }
      searchFunction();
      
    }
  }, [selectedCityList, selectedUseCaseList]);
  useEffect(() => {
    //todo
    // if (user) {
    const userId = isLogin();
    setUserId(userId);
    setDisabled(!userId);
    if (userId) {
      enableAutoComplete();
    } else {
      disableAutoComplete();
    }
    // return (
    //   () => {
    //     handleClear()
    //   }
    // )
  }, [])


  const handleSpecificSearchResponse = async (searchId, searchtype) => {
    //
    
    if (searchId) {
      const payLoad = {
        saveSearchId: searchId,
        type: searchtype,
      };
      const response = await getSpecificSearch(payLoad);
      //
      setSearchCriteria(response);
    }
  };
  // const reinitializeSearcheSection = () => {
  //   setActiveSearch(false);
  //   setTimeout(() => {
  //     setActiveSearch(true);
  //   });
  // };
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
  const searchFunction = async () => {
    let location = selectedCityList.map((city) => {
      return {
        geo_id: city?.id,
        geographic_area_name: city?.name,
      };
    });
    //
    let useCase = selectedUseCaseList.map((element) => {
      return {
        use_case_group: element.code,
      };
    });

    const payLoad = {
      location,
      usecase: useCase
    };
    const { data } = await getSearchedResult(payLoad);
    if (data) {
      //
      const cityNameList = selectedCityList.map(({ name }) => {
        return name;
      });

      const usecaseNameList = selectedUseCaseList.map(({ name }) => {
        return name;
      });


      setCityNameList(cityNameList.join(" , "));
      setUseCaseNameList(usecaseNameList.join(" , "));
      // setIsDataSearched(true);
      // setSearchTitle();
      setSearchedReasult(data);
      navigate("/search_result");
      const { general_stat, usecase, marketSegment } = data;

      // 
      // setReceivedSearchResult(false);
      setCityNameResultList(selectedCityList);

      const searchResultRowData = ArrangeSearchData({
        CityData: [selectedCityList],
        GeneralStat: [general_stat],
        UseCases: [usecase],
        MarketSegmentData: [marketSegment.data]
      })
      
      
      setXreaTableRows(searchResultRowData)
      // setTableActive(true);
    }
  };
  const enableAutoComplete = () => {
    setAutocompleteEnabled(true);
  }
  const disableAutoComplete = () => {
    setAutocompleteEnabled(false);
  }
  const handleChangeCity = async (e) => {
    

    const { value } = e.currentTarget;
    if (value.length >= 2) {
      const { data } = await getCityList(value);
      // 
      setCityList(data);
      
    }

  };
  let autoCompleteSelectPropsCity = {
    headerName: "Location (city, state)",
    tableActive,
    multiSelectInputList: cityList,
    setSelectedList: setSelectedCityList,
    selectedList: selectedCityList,
    setSavedList: setSavedCityList,
    savedList: savedCityList,
    list: true,
    handleChange: handleChangeCity,
  };
  let autoCompleteSelectPropsUseCase = {
    headerName: "Use case",

    multiSelectInputList: useCaseList,
    setSelectedList: setSelectedUseCaseList,
    selectedList: selectedUseCaseList,
    setSavedList: setSavedUseCaseList,
    savedList: savedUseCaseList,
    list: false,
  };
  // 
  // 
  const handleClickOnSearch = () => {
    // setSearchTitle();
    
    if (xreaSeachButtonTitle == "Save this XREA Search") {
      setXreSearchDisable(false);
    }
    searchFunction();
  }
  const button1Props = {
    title: "Search",
    handleClick: handleClickOnSearch,
    disabled,
    style: {
      bgcolor: disabled ? "#cccccc" : AppStyle.palette.primary.main,
    }
  };
  return (
    <SectionCard>
      <Box sx={searchContainter}>
        <Grid container spacing={1}>
          <Grid item xs={5.25} sx={autocompleteEnabled ? null : disableStyle}>
            <AutoCompleteSelect props={autoCompleteSelectPropsCity} />
          </Grid>
          <Grid item xs={5.25} sx={autocompleteEnabled ? null : disableStyle}>
            <AutoCompleteSelect props={autoCompleteSelectPropsUseCase} />
          </Grid>
          <Grid item xs={1.5}>
            <Stack sx={searchButtonContainer}>
              <Box sx={searchButtonStyle}>
                <Button1 props={button1Props} />
                {
                  hasResult &&
                  <Box variant="contained"
                    onClick={() => userId && handleClear()}
                    sx={userId ? clearLinkStyle : { ...clearLinkStyle, ...disable }}>
                    Clear search
                  </Box>
                }
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </SectionCard>
  );
};

export default SearchSection;
