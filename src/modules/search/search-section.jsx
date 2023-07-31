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
import { getUseCaseList } from "server/api/get-usecase-list";
import Button1 from "shared/utils/button/button1";
import { LoadingContext } from "store2/loading-context-provider";
import { SectionCard } from "shared/components";
import { useLocation } from "react-router-dom";
import isLogin from "shared/utils/associate/is-login";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
  UserButton,
  useSignIn,
  useUser,
} from "@clerk/clerk-react";
import cityWithGeoId from "./v1-states.json";

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
  const { searchTitle, setSearchTitle } = searchTitleGetterSetter;
  // const { user } = userGetterSetter;

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
  const { isSignedIn, user, isLoaded } = useUser();
  const nameList = cityWithGeoId.data.city_view_2021;

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
      const data  = await getUseCaseList();
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
    if(isLoaded && isSignedIn) {
      enableAutoComplete();
    } else {
      disableAutoComplete();
    }
  }, [isLoaded, isSignedIn, user])


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
      const currentFilteredOptions = nameList.filter(
        (city) =>
            city.city_name.toLowerCase().indexOf(value.toLowerCase()) > -1 && filterStateIfApplicable(city)
    );
    const data = currentFilteredOptions.map((city) => {
        return {
            name: city.city_name + ", " + city.state_name,
            id: city.geo_id,
        };
    });

    setCityList(data);
    }
  };

  const filterStateIfApplicable = (city) => {
    if(selectedCityList.length > 0) {
      const selectedState = selectedCityList[0].name;
      return selectedState.includes(city.state_name);
    }
    return true;
  }
  let autoCompleteSelectPropsCity = {
    headerName: "Location (city, state)",
    tableActive,
    multiSelectInputList: cityList,
    setSelectedList: setSelectedCityList,
    selectedList: selectedCityList,
    savedList: savedCityList,
    list: true,
    handleChange: handleChangeCity,
  };
  let autoCompleteSelectPropsUseCase = {
    headerName: "Use case",
    multiSelectInputList: useCaseList,
    setSelectedList: setSelectedUseCaseList,
    selectedList: selectedUseCaseList,
    savedList: savedUseCaseList,
    list: false
  };

  const handleClickOnSearch = () => {
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
                    onClick={() => isSignedIn && handleClear()}
                    sx={isSignedIn ? clearLinkStyle : { ...clearLinkStyle, ...disable }}>
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
