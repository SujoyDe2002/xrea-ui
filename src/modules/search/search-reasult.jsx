import { React, useRef, useContext, useEffect } from "react";
import {
  ArrayObjectValues,
  SectionSearchCard,
  getLocalStorageItem,
  setLocalStorageItem,
} from "shared/utils";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  GeneralStat,
  UseCaseTable,
  MarketSegmentRow,
  TableHeading,
} from "./search-result-grid";
import {
  input,
  searchResultSection,
  tabRight,
  tabStyle,
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

const SearchReasult = ({ searchReasultProps }) => {
  const { loaderFunction, handleResponseMessage, userGetterSetter } =
    useContext(LoadingContext);
  const { startLoader, stopLoader } = loaderFunction;
  const { user } = userGetterSetter;
  const [showDialog, setShowDialog] = useState(false);
  const [searchName, setSearchName] = useState();
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(false);
  const [noOfsearch, setNoOfsearch] = useState(
    getLocalStorageItem("xrea")?.data?.noOfsearch
  );
  const [xreSearchDisable, setXreSearchDisable] = useState(false);
  const { searchedReasult, cityNameResultList, getCityIndex } =
    searchReasultProps;
  const { general_stat, usecase, marketSegment } = searchedReasult;
  const theme = useTheme();
  const [xreaSeachButtonTitle, setXreSearchButtonTitle] = useState(
    "Save this XREA Search"
  );

  useEffect(() => {
    const logdata = getLocalStorageItem("xrea")?.data;
    const maxSavedLength = logdata?.maxSavedLength;
    const userId = logdata?.loginData?.userId;
    const isdisabled = logdata?.isdisabled;
    setUserId(userId);
    // console.log("maxSavedLength", maxSavedLength);
    // console.log("noOfsearch before", noOfsearch);
    if (userId && !isdisabled) {
      if (noOfsearch >= maxSavedLength) {
        // console.log("noOfsearch if", noOfsearch);
        // } else {
        setXreSearchButtonTitle("Saved searches limit exceeded");
        setXreSearchDisable(true);
        // console.log("noOfsearch else", noOfsearch);
      }
    } else {
      setXreSearchButtonTitle("Save this XREA Search");
      setXreSearchDisable(true);
    }
    // console.log("noOfsearch after", noOfsearch);
  }, [noOfsearch]);

  const secondarybtn = {
    textTransform: "none",
    bgcolor: theme.palette.secondary.main,
    fontWeight: 700,
    fontSize: "1.125rem",
    lineHeight: "107.5%",
  };
  const resultTableRef = useRef();
  const marketSegmentProps = {
    rowLength: general_stat.data?.length,
    getCityIndex,
    marketSegmentData: marketSegment,
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
  // console.log("cityNameResultList", cityNameResultList);
  // console.log("usecase", usecase);
  const saveSearch = async () => {
    const xreaData = getLocalStorageItem("xrea").data;
    const { userId } = xreaData.loginData;
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
      user_id: userId,
      city: citits,
      usecase: usecases,
    };
    closeDialog();
    startLoader();
    const { data } = await postSearchDetails(payLoad);
    stopLoader();

    // console.log("statusCode", statusCode);
    const { statuscode, noOfSavedSearch } = data;
    if (statuscode === 200) {
      handleResponseMessage("Search saved successfully!");
      const noOfSearch = Number(noOfSavedSearch);
      setLocalStorageItem("xrea", { ...xreaData, noOfsearch });
      setNoOfsearch(noOfSearch);
    } else {
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
        error={false}
        id="date"
        placeholder="Enter Name of your search"
        type="text"
        sx={input}
        onChange={(e) => setSearchName(e.target.value)}
        value={searchName}
        InputLabelProps={{
          shrink: true,
        }}
      />
    ),
    dialogAction: {
      button1: <Button2 props={button2Props} />,
      button2: <Button1 props={button1Props} />,
    },
  };
  const data = ArrayObjectValues(general_stat.data);
  const xreaTooltipTitle =
    "You have exceeded the limit of saved searches. Please delete older searches before saving new ones.";
  // console.log("data", data);
  return (
    <SectionSearchCard>
      <SearchSectionHeading>
        <Typography variant="h2" sx={searchResultSection}>
          Search results
        </Typography>
        {xreSearchDisable && userId ? (
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
      <Box ref={resultTableRef} sx={tablesContainter}>
        <Stack direction={"row"} justifyContent={"start"} spacing={2}>
          <Box sx={tabRight}></Box>
          {cityNameResultList.map((city) => {
            return (
              <Box key={city.name} sx={tabStyle}>
                {city.name}
              </Box>
            );
          })}
        </Stack>
        <MarketSegmentRow marketSegmentProps={marketSegmentProps} />
        <TableHeading heading={"GENERAL STATISTICS"} />
        <GeneralStat rows={general_stat} />
        <TableHeading heading={"USE CASE SCORE"} />
        <UseCaseTable rows={usecase} />
      </Box>
      {showDialog && <AlertDialog props={AlertDialogProps} />}
    </SectionSearchCard>
  );
};

export default SearchReasult;
