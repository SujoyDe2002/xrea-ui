import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { SearchDetails } from "./search-details";
import { Box } from "@mui/material";
import { searchViewcontainer } from "app";
import { useEffect } from "react";
import { OrderXrea } from "./order-xrea";
import { getLocalStorageItem } from "shared/utils";

export const SearchView = ({ setDisbled }) => {
  const location = useLocation();
  const [cityNameList, setCityNameList] = useState(null);
  const [usecaseList, setUsecaseList] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isDataSearched, setIsDataSearched] = useState(false);
  const { id } = location?.state || {};
  const SearchCriteria = {
    searchId: id,
  };
  useEffect(() => {
    setDisbled(id !== undefined ? true : false);
    if (getLocalStorageItem("xrea")) {
      const { loginData } = getLocalStorageItem("xrea").data;
      setUserId(loginData?.userId);
    }
  }, []);

  const [marketSegmentData, setMarketSegmentData] = useState(null);
  const history = useHistory();
  const handleOnClick = () => {
    setMarketSegmentData({
      homePToIncome: "5.5",
      tenYearPopGrowthRate: "0.3%",
      medianIncome: "$49.0k",
    });
  };
  const searchDetailsProps = {
    handleOnClick: handleOnClick,
    setMarketSegmentData,
    setCityNameList,
    setUsecaseList,
    setIsDataSearched,
  };
  const handleClick = () => {
    // console.log("setMarketSegmentData", setMarketSegmentData);
    setMarketSegmentData(null);
  };
  // console.log("usecaseListdd", usecaseList);
  return (
    <Box sx={searchViewcontainer}>
      <Box
        sx={{
          display: marketSegmentData ? "none" : "block",
          paddingBottom: "2rem",
        }}
      >
        <SearchDetails searchDetailsProps={searchDetailsProps}>
          {SearchCriteria}
        </SearchDetails>
        <Box mt={5}>
          {userId && (
            <OrderXrea
              isDataSearched={isDataSearched}
              cityList={cityNameList}
              useCaseList={usecaseList}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
