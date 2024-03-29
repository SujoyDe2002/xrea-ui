import { Box, Grid, Stack, Typography } from "@mui/material";
import {
  boxContainer,
  searchResultSection,
  headerstyle,
  iconboxstyle,
  iconValue,
  marketsegmenttypography,
} from "app";
import SearchSection from "modules/search/search-section";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { SectionSearchCard } from "shared/utils";
import ContentWrapper from "shared/utils/layout/content-wrapper";
import ScrollToTop from "shared/utils/scroll-to/scroll-to-top";
import { LoadingContext } from "store2/loading-context-provider";

 const MarketSegmentView = () => {
  const { marketSegmentData  } = useContext(LoadingContext);

  const {
    cityName,
    tenYearPopGrowthRate,
    medianIncome,
    homePToIncome,
    clusterName,
    cluster_desc
  } = marketSegmentData ;

  const history = useHistory();
  const handleClickOnBackToSearch = () => {
    history.push("/search_result")
  };
  return (
    <ContentWrapper>
      <SearchSection />
      <SectionSearchCard>
        <Box sx={boxContainer}>
          <Box onClick={handleClickOnBackToSearch}>
            <Typography sx={{ ...headerstyle, cursor: "pointer" }}>
              {" "}
              {"< Back to Search"}{" "}
            </Typography>
          </Box>
          <Stack
            mt={5}
            flexDirection={"row"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Typography variant="h2" sx={searchResultSection}>
              Market Segment in {cityName} : {clusterName}
            </Typography>
          </Stack>
        </Box>

        <Stack
          direction="row"
          justifyContent={"center"}
          spacing={2}
          sx={{ padding: "20px 20px 30px 20px", width: "100%" }}
        >
          <div>
            <Box sx={iconboxstyle}>
              <img
                src="/playground_assets/pentagon.svg"
                alt="pentagon"
                className="icon"
              />
              <Typography sx={iconValue}>{tenYearPopGrowthRate}</Typography>
            </Box>
            <Typography>10-year population growth</Typography>
          </div>
          <div>
            <Box sx={iconboxstyle}>
              <img
                src="/playground_assets/square.svg"
                alt="square"
                className="icon"
              />
              <Typography sx={iconValue}>{homePToIncome}</Typography>
            </Box>
            <Typography>Home Price to Income Ratio</Typography>
          </div>
          <div>
            <Box sx={iconboxstyle}>
              <img
                src="/playground_assets/octagon.svg"
                alt="octagon"
                className="icon"
              />
              <Typography sx={iconValue}>{medianIncome}</Typography>
            </Box>
            <Typography>Median Income</Typography>
          </div>
        </Stack>
        <br></br>
        <Stack>
          <Grid>
            <Typography sx={marketsegmenttypography}>{cluster_desc}</Typography>
          </Grid>
        </Stack>
      </SectionSearchCard>
    </ContentWrapper>
  );
};

export default ScrollToTop(MarketSegmentView)