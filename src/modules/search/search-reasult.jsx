import { React, useContext, useEffect } from "react";
import ScrollContainer from 'react-indiana-drag-scroll';
import {
  GetAttribute,
  SectionSearchCard,
  getLocalStorageItem,
  setLocalStorageItem,
} from "shared/utils";
import { Box, Button, TextField, Typography, FormControlLabel, FormControl, FormLabel, RadioGroup, Radio, Stack } from "@mui/material";
import {
  button4,
  customStyleForXREAText,
  input,
  radioDisablabel,
  radioStyle,
  searchResultSection,
  searchResultText,
  searchTitleContainerStyle,
  secondarybtn,
  showDropDownContainerStyle,
  showRadioItemStyle,
  tablesContainter,
} from "app";
import { SearchSectionHeading } from "./search-section-heading";
import AlertDialog from "shared/utils/dialog/alert-dialog";
import { useState } from "react";
import Button1 from "shared/utils/button/button1";
import Button2 from "shared/utils/button/button2";
import { postSearchDetails } from "server/api/save-search";
import { LoadingContext } from "store2/loading-context-provider";
import BrightTooltip from "shared/utils/tooltip/bright-tooltiip";
import { XreaTable } from "shared/utils/data-table/xrea-table";
import SearchSection from "./search-section";
import ContentWrapper from "shared/utils/layout/content-wrapper";
import { useHistory } from "react-router-dom";
import { OrderXrea } from "./order-xrea";
import ScrollToTop from "shared/utils/scroll-to/scroll-to-top";
import { useUser } from "@clerk/clerk-react";

const SearchReasult = () => {
  const {
    loaderFunction,
    handleResponseMessage,
    searchTitleGetterSetter,
    searchedReasult,
    cityNameResultList,
    xreSearchDisable,
    setXreSearchDisable,
    xreaTableRows,
    xreaSeachButtonTitle,
    setXreSearchButtonTitle,
    setSearchCriteria,
    setMarketSegmentData
  } =
    useContext(LoadingContext);

  const showDropdown = [
    {
      value: "G",
      label: "Grade",
      dropdownHeading:
        <>
          <Typography style={{ ...customStyleForXREAText, display: 'inline-block', marginRight: '10px' }}>XREA
          </Typography>
          <Typography style={{ ...customStyleForXREAText }}> Score </Typography>
        </>
    },
    {
      value: "P",
      label: "Percentile score",
      dropdownHeading:
        <Typography style={{ ...customStyleForXREAText }}> Score percentile </Typography>
    }
  ]

  const firstDropDownElement = showDropdown[0];

  const { searchTitle, setSearchTitle } = searchTitleGetterSetter
  const { startLoader, stopLoader } = loaderFunction;
  const [showDialog, setShowDialog] = useState(false);
  const [searchName, setSearchName] = useState();
  // const [userId, setUserId] = useState();
  const [noOfsearch, setNoOfsearch] = useState(
    getLocalStorageItem("xrea")?.data?.noOfsearch
  );
  const [radioVisible, setRadioVisible] = useState(false);
  const [saveSearchInputError, setSaveSearchInputError] = useState();
  const [selectedValue, setSelectedValue] = useState(firstDropDownElement.value);
  const [dropdownHeading, setDropdownHeading] = useState(firstDropDownElement.dropdownHeading);

  const history = useHistory();
  const { usecase } = searchedReasult || {};
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    const logdata = getLocalStorageItem("xrea")?.data;
    const maxSavedLength = logdata?.maxSavedLength;
    // const userId = isLogin();
    const isdisabled = logdata?.isdisabled;
    // setUserId(userId);
    if (isSignedIn) {
      if (noOfsearch >= maxSavedLength) {
        setXreSearchButtonTitle("Saved searches limit exceeded");
        setXreSearchDisable(true);
      } else {

        setXreSearchButtonTitle("Save this XREA Search");
        setXreSearchDisable(isdisabled);

      }
    } else {
      setXreSearchButtonTitle("Save this XREA Search");
      setXreSearchDisable(true);
    }
    return () => {
      setSearchTitle()
    }
  }, [noOfsearch]);
  useEffect(() => {
    setSearchCriteria()
  }, [])

  const getCityIndex = (e) => {
    const indexValue = GetAttribute(e, "indexid");
    const selectedResultRow = searchedReasult.general_stat.data[indexValue];
    const selectedMarketSegmentRow =
      searchedReasult.marketSegment.data[indexValue];
    const { tenYearPopGrowthRate, medianIncome, homePToIncome } =
      selectedResultRow;
    const { clusterName, cluster_desc } = selectedMarketSegmentRow;
    const cityName = cityNameResultList[indexValue].name;
    history.push('/market_segment');
    setMarketSegmentData({
      cityName,
      tenYearPopGrowthRate,
      medianIncome,
      homePToIncome,
      clusterName,
      cluster_desc
    });
  };

  const handleDropdownClick = () => {
    setRadioVisible(!radioVisible);
  }
  const handleRadioChange = ({ target }) => {
    const selectedDropdownValue = target.value;
    setSelectedValue(selectedDropdownValue);
    const { dropdownHeading } = showDropdown.find(({ value }) => value === selectedDropdownValue);
    setDropdownHeading(dropdownHeading);
    handleDropdownClick();
  };
  const openDialog = () => {
    setShowDialog(true);
  };
  const closeDialog = () => {
    setShowDialog(false);
  };
  const openSaveSearch = () => {
    openDialog();
  };
  const saveSearch = async () => {
    setSaveSearchInputError();
    if (searchName) {
      const xreaData = getLocalStorageItem("xrea")?.data;

      // const {userId} = xreaData.loginData;
      const citits = cityNameResultList.map(({ name, id }) => {
        return {
          geographic_area_name: name,
          geoId: id,
        };
      });
      const usecases = usecase.label.map(
        ({ use_case_group, use_case_group_desc, use_case_color }) => {
          return {
            code: use_case_group,
            name: use_case_group_desc,
            color: use_case_color,
          };
        }
      );
      const payLoad = {
        name: searchName,
        user_id: user?.id,
        city: citits,
        usecase: usecases,
      };
      startLoader();
      const { data } = await postSearchDetails(payLoad);
      stopLoader();
      const { code, message } = data;
      if (code === 200) {
        closeDialog();
        handleResponseMessage(message);
        let noOfSavedSearch = data.saveSearchCount;
        
        const noOfSearch = Number(noOfSavedSearch);
        setLocalStorageItem("xrea", { ...xreaData, noOfsearch });
        setNoOfsearch(noOfSearch);
      } else {
        setSaveSearchInputError(message);
      }
    } else {
      setSaveSearchInputError("Enter a search title");
    }
  };
  const button1Props = {
    title: "Save",
    handleClick: saveSearch,
  };
  const button2Props = {
    title: "Cancel",
    handleClick: closeDialog,
  };
  const AlertDialogProps = {
    title: "Save XREA search",
    dialogContent: (
      <TextField
        error={saveSearchInputError}
        helperText={saveSearchInputError}
        id="date"
        placeholder="Enter Name of your search"
        type="text"
        sx={input}
        onChange={(e) => setSearchName(e.target.value)}
        value={searchName}
        InputLabelProps={{
          shrink: true
        }}
      />
    ),
    dialogAction: {
      button1: <Button2 props={button2Props} />,
      button2: <Button1 props={button1Props} />
    },
    actionsOnUnMount: function () {
      setSearchName();
      setSaveSearchInputError();
    }
  };

  const xreaTooltipTitle =
    "You have exceeded the limit of saved searches. Please delete older searches before saving new ones.";
  return (
    <>
      <ContentWrapper>
        <SearchSection />
        <SectionSearchCard>
          {
            xreaTableRows && xreaTableRows.length > 0 ? (
              <SearchSectionHeading>
                <Stack sx={searchTitleContainerStyle} >
                <Typography variant="h2" sx={searchResultSection}>
                  {searchTitle ? searchTitle : "Search results"}
                </Typography>
                <Stack sx={showDropDownContainerStyle}>
                  <FormControl>
                    <Button sx={button4} variant="contained" onClick={handleDropdownClick}
                      disableElevation>
                      <Typography style={{ ...searchResultText, display: 'inline-block' }}>Showing</Typography>
                      {dropdownHeading}
                      <Box sx={{marginLeft: "8px"}}>
                      <img
                        src="/playground_assets/down-triangle.svg"
                      />
                      </Box>
                    </Button>
                    {radioVisible && (
                      <FormControl >
                        <FormLabel disabled style={radioDisablabel}>Select your default view:</FormLabel>
                        <RadioGroup
                          name="radioButtons"
                          value={selectedValue}
                          onChange={handleRadioChange}
                        >
                          {showDropdown && showDropdown.length > 0 &&
                            showDropdown.map(({ label, value }, index) =>
                              <FormControlLabel key={index} value={value} control={<Radio size={'12px'} sx={radioStyle} />} label={
                                <Typography variant="body1" sx={showRadioItemStyle}>
                                  {label}
                                </Typography>
                              } />
                            )
                          }
                        </RadioGroup>
                      </FormControl>
                    )}
                  </FormControl>
                </Stack>
                </Stack>
                {xreSearchDisable && isSignedIn ? (
                  <BrightTooltip title={xreaTooltipTitle} placement="bottom" arrow>
                    <span>
                      <Button
                        variant="contained"
                        sx={secondarybtn}
                        onClick={openSaveSearch}
                        disabled={xreSearchDisable}
                      >
                        {xreaSeachButtonTitle}
                      </Button>
                    </span>
                  </BrightTooltip>
                ) : (
                  <Button
                    variant="contained"
                    sx={secondarybtn}
                    onClick={openSaveSearch}
                    disabled={xreSearchDisable}
                  >
                    {xreaSeachButtonTitle}
                  </Button>
                )}
              </SearchSectionHeading>
            ) :
              null
          }
          <Box sx={tablesContainter}>
            <ScrollContainer >
              <XreaTable rows={xreaTableRows} getCityIndex={getCityIndex} currentDropdown={selectedValue} />
            </ScrollContainer>
          </Box>
          {showDialog && <AlertDialog props={AlertDialogProps} />}
        </SectionSearchCard>
      </ContentWrapper>
      <OrderXrea />
    </>
  );
};




export default ScrollToTop(SearchReasult);
