import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Helmet } from "react-helmet";
import {
  cardsContainer,
  headerItemsContainer,
  headerRightContiner,
  layoutContainer,
  loginFont,
  logoContainter,
  logoImageContainer,
  pageHeader,
  smallFont,
} from "app";
import { HomeDetails } from "./homeDetails";
import ContentWrapper from "shared/utils/layout/content-wrapper";
import SearchDraftedResult from "modules/search/search-drafted-result";
import SearchReasult from "modules/search/search-reasult";
import PricingContent from "modules/pricing/pricing-content";
import MarketSegmentView from "modules/market/market-segment-view";

import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser
} from "@clerk/clerk-react";


export const HomeView = () => {

  const [loginPopoutModal, setLoginPopoutModal] = useState(false);
  const { isSignedIn, user } = useUser();

  const history = useHistory();
  const handleLogin = () => {
    setLoginPopoutModal(true);
  };

  return (
    <Box sx={layoutContainer}>
      <Box
        sx={{
          width: "100%",
          padding: 0,
          position: "relative",
          height: "100vh",
          overflowY: "scroll",
        }}
      >
        <Helmet>
          <title>XREA</title>
        </Helmet>
        <Box sx={pageHeader}></Box>
        <Box sx={cardsContainer}>
          <ContentWrapper>
            <Stack sx={headerItemsContainer}>
              {/* XREA LOGO */}
              <Stack sx={logoContainter}>
                <Stack
                  sx={logoImageContainer}
                >
                  <img
                    src="/playground_assets/logo.svg"
                    alt="Rectangle4I120"
                    className="logo"
                    onClick={() => {
                      history.push("/");
                    }}
                  />
                </Stack>
              </Stack>
              <Stack sx={headerRightContiner} className="">
                {/* Signed out profile picture */}
                <SignedOut>
                  <Box className="mb-[35px]">
                    <img
                      src="/playground_assets/image2i120-7k5g-200h.png"
                      alt="image2I120"
                      className="frame-homepagewiththesearchbarandthetotallistofclu-image2"
                    />
                  </Box>
                </SignedOut>
                <Box mr={3} mb={4}>
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        userButtonPopoverCard: {
                          "margin-left": "200px",
                        },
                      },
                    }}
                  />
                </Box>
                <Box className="mb-[35px]">
                  {loginPopoutModal ?
                    <SignIn redirectUrl="/saved_searches"
                      appearance={{
                        elements: {
                          rootBox: "absolute right-[30px] top-[50px]",
                        }
                      }}></SignIn> : <div></div>}
                  <Typography sx={loginFont} component={"div"}>
                    <Box sx={{ cursor: "pointer" }} onClick={handleLogin}>
                      {user ? `${user.fullName}` : "Log In / Sign Up"}
                    </Box>
                  </Typography>
                  <Typography sx={smallFont} component={"div"}>
                    <SignedIn>
                      {isSignedIn ? (
                        <div>{user.fullName}</div>
                      ) : (
                        <div>please sign in</div>
                      )}
                    </SignedIn>
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </ContentWrapper>

          <Switch>
            <Route exact path="/">
              <HomeDetails />
            </Route>
            <Route exact path="/saved_searches">
              <SearchDraftedResult />
            </Route>
            <Route exact path="/search_result">
              <SearchReasult />
            </Route>
            <Route exact path="/market_segment">
              <MarketSegmentView />
            </Route>
            <Route exact path="/pricing">
              <PricingContent />
            </Route>
          </Switch>
        </Box>
      </Box>
    </Box>
  );
};
