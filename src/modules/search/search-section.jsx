import { Grid } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { React, useState, useEffect, useContext, useLayoutEffect } from "react";
import {
  AutoCompleteSelect,
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
import { useLocation } from "react-router-dom";
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
    searchFunction,
    setSelectedCityList,
    setSelectedUseCaseList,
    setSearchedReasult,
    setCityNameResultList,
    setXreSearchDisable,
    xreaSeachButtonTitle,
    setXreaTableRows,
    setSearchCriteria,
    handleSpecificSearchResponse,
    savesearchId,
    hasResult,
    setSaveSearchId,
    setUseCaseNameList
  } = useContext(LoadingContext);
  const {  setSearchTitle } = searchTitleGetterSetter;
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

  useEffect(() => {
    if (SearchCriteria?.searchId) {
      handleSpecificSearchResponse(SearchCriteria?.searchId, "GUEST");
    }
    if (savesearchId) {
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

  useLayoutEffect(() => {
    if (searchCriteria?.city && selectedCityList?.length > 0) {
      updateLocalStorage("xrea", { isdisabled: true })
     
    }
  }, [selectedCityList]);
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
   
  }, [])


  
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
  const handleClickOnSearch = () => {
    // setSearchTitle();
    if (xreaSeachButtonTitle == "Save this XREA Search") {
      setXreSearchDisable(false);
    }
    searchFunction();
    setSearchTitle();
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
