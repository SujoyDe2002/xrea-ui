import React, { useState, useContext, useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Helmet } from "react-helmet";
import {
  cardsContainer,
  headerItemsContainer,
  headerRightContiner,
  layoutContainer,
  loginFont,
  pageHeader,
  smallFont,
} from "app";
import { HomeDetails } from "./homeDetails";
import { SearchView } from "modules/search";
import { getLocalStorageItem, removeLocalStorageItems, setLocalStorageItem } from "shared/utils";
import { LoadingContext } from "store2/loading-context-provider";
import { userInfo } from "user-config";
import ContentWrapper from "shared/utils/layout/content-wrapper";
import SearchDraftedResult from "modules/search/search-drafted-result";
import SearchReasult from "modules/search/search-reasult";
import isLogin from "shared/utils/associate/is-login";
import PricingContent from "modules/pricing/pricing-content";
import MarketSegmentView from "modules/market/market-segment-view";

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
import { BrowserRouter, useNavigate } from "react-router-dom";

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export const HomeView = () => {
  const { userGetterSetter, searchGetterSetter, handleClear } =
    useContext(LoadingContext);
  const { receivedSearchResult, setReceivedSearchResult } = searchGetterSetter;
  const [loginPopoutModal, setLoginPopoutModal] = useState(false);
  const { isSignedIn, user } = useUser();

  const history = useHistory();
  const handleLogin = () => {
    const userId = userInfo.userId;
    const loginData = {
      userId,
    };
    setLocalStorageItem("xrea", { loginData });
    setLoginPopoutModal(true);
  };
  const [disbled, setDisbled] = useState(false);


  const handleLogoClick = () => {
    let userId = null;
    if (getLocalStorageItem("xrea")) {
      const { loginData } = getLocalStorageItem("xrea").data;
      userId = loginData?.userId;
    }

    if (userId) {
      setReceivedSearchResult(!receivedSearchResult);
    } else {
      history.push("/");
    }
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
          <Stack sx={headerItemsContainer}>
            <div className="frame-homepagewiththesearchbarandthetotallistofclu-group7">
              <Box
                onClick={handleLogoClick}
                className="frame-homepagewiththesearchbarandthetotallistofclu-group4"
              >
                <img
                  src="/playground_assets/logow.svg"
                  alt="Rectangle4I120"
                  className="logo"
                />
                <Box></Box>
                <img
                  src="/playground_assets/austintacosi120-xuvc.svg"
                  alt="AustinTacosI120"
                  className="frame-homepagewiththesearchbarandthetotallistofclu-austin-tacos"
                />
              </Box>
            </div>
            <Stack sx={headerRightContiner}>
              <SignedOut>
                <Box mr={-3}>
                  <img
                    src="/playground_assets/image2i120-7k5g-200h.png"
                    alt="image2I120"
                    className="frame-homepagewiththesearchbarandthetotallistofclu-image2"
                  />
                </Box>
              </SignedOut>
              <Box mr={5} mb={4}>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonPopoverCard: {
                        "margin-left": "250px",
                      }
                    }
                    }}
                />
              </Box>
              <Box>
                {loginPopoutModal ? <SignIn></SignIn> : <div></div>}
                <Typography sx={loginFont} component={"div"}>
                  {disbled ? (
                    <Box sx={{ cursor: "text" }}>{"Log In / Sign Up"}</Box>
                  ) : (
                    <Box sx={{ cursor: "pointer" }} onClick={handleLogin}>
                      {user ? `${userInfo.companyName}` : "Log In / Sign Up"}
                    </Box>
                  )}
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
          <Switch>
            <Route exact path="/">
              <HomeDetails setDisbled={setDisbled} />
            </Route>
            <Route exact path="/search">
              <SearchView setDisbled={setDisbled} />
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
