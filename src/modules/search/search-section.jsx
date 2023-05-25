import { Grid } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { React, useState, useEffect } from "react";
import {
  AutoCompleteSelect,
  updateLocalStorage,
} from "shared/utils";
import {
  AppStyle,
  clearLinkStyle,
  disable,
  searchButtonContainer,
  searchButtonStyle,
  searchContainter,
} from "app";
import { getCityList } from "server/api/get-citylist";
import { getUseCaseList } from "server/api/get-usecase-list";
import Button1 from "shared/utils/button/button1";

const SearchSection = ({
  searchCriteria,
  tableActive,
  setCityList,
  cityList,
  selectedUseCaseList,
  selectedCityList,
  searchFunction,
  handleClear,
  setSelectedCityList,
  setSelectedUseCaseList,
  curentSearchTitle
}) => {
  const [useCaseList, setUseCaseList] = useState([]);
  const [disabled, setDisabled] = useState(false);
  console.log("searchCriteria11111111", searchCriteria);
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const { data } = await getUseCaseList();
      if (isMounted) setUseCaseList(data);
      if (searchCriteria?.city) {
        setSelectedCityList(searchCriteria?.city);
        if (searchCriteria?.useCase) {
          setSelectedUseCaseList(searchCriteria.useCase);
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [searchCriteria]);

  useEffect(() => {
    //  console.log("selectedCityList", selectedCityList);

    if (searchCriteria?.city && selectedCityList?.length > 0) {
      updateLocalStorage("xrea", { isdisabled: true })
      if (!curentSearchTitle) {

        setDisabled(true);
      } else {
        setDisabled(false);

      }
      searchFunction();
      console.log("inside search");
    }
  }, [selectedCityList, selectedUseCaseList]);

  const handleChangeCity = async (e) => {
    if (selectedCityList.length <= 4) {
      const { value } = e.currentTarget;
      if (value.length >= 2) {
        const { data } = await getCityList(value);
        // console.log("cityList", data);
        setCityList(data);
      }
    } else {
      setCityList([]);
    }
  };
  let autoCompleteSelectPropsCity = {
    headerName: "Location (city, state)",
    tableActive,
    multiSelectInputList: cityList,
    setSelectedList: setSelectedCityList,
    selectedList: selectedCityList,
    list: true,
    handleChange: handleChangeCity,
    disabled,
  };
  let autoCompleteSelectPropsUseCase = {
    headerName: "Use case",
    tableActive,
    multiSelectInputList: useCaseList,
    setSelectedList: setSelectedUseCaseList,
    list: false,
    selectedList: selectedUseCaseList,
    disabled,
  };
  // console.log("selectedCityList", selectedCityList);
  // console.log("selectedUseCaseList", selectedUseCaseList);
  const button1Props = {
    title: "Search",
    handleClick: searchFunction,
    disabled,
    style: {
      bgcolor: disabled ? "#cccccc" : AppStyle.palette.primary.main,
    },
  };
  return (
    <Box sx={searchContainter}>
      <Grid container spacing={1}>
        <Grid item xs={5.25}>
          <AutoCompleteSelect props={autoCompleteSelectPropsCity} />
        </Grid>
        <Grid item xs={5.25}>
          <AutoCompleteSelect props={autoCompleteSelectPropsUseCase} />
        </Grid>
        <Grid item xs={1.5}>
          <Stack sx={searchButtonContainer}>
            <Box sx={searchButtonStyle}>
              <Button1 props={button1Props} />
              {disabled ? (
                <Box variant="contained" sx={{ ...clearLinkStyle, ...disable }}>
                  Clear search
                </Box>
              ) : tableActive ? (
                <Box
                  variant="contained"
                  sx={clearLinkStyle}
                  onClick={handleClear}
                >
                  Clear search
                </Box>
              ) : null}
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchSection;
