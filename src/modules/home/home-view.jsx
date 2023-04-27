import React, { useState } from 'react'
import { Link, Switch, Route, useHistory } from 'react-router-dom'
import { Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Helmet } from 'react-helmet'
import { cardsContainer, headerItemsContainer, layoutContainer, loginFont, pageHeader, smallFont } from 'app'
import { HomeDetails } from './homeDetails'
import { SearchView } from 'modules/search'


export const HomeView = () => {
  const [user, setUser] = useState(null)
  const history = useHistory();
  const handleLogin = () => {
    setUser(true);
    history.push("/search")
  }

  return (
    <Box sx={layoutContainer}>

      <Box sx={{ width: "100%", padding: 0, position: "relative", height: "100vh", overflowY: "scroll" }}>
        <Helmet>
          <title>XREA</title>
        </Helmet>
        <Box sx={pageHeader}></Box>
        <Box sx={cardsContainer}>
          <Stack sx={headerItemsContainer}>

            <div className="frame-homepagewiththesearchbarandthetotallistofclu-group7">
              <Link to={"/"}>

                <div className="frame-homepagewiththesearchbarandthetotallistofclu-group4">
                  <img
                    src="/playground_assets/logow.svg"
                    alt="Rectangle4I120"
                    className='logo'
                  />
                  <img
                    src="/playground_assets/austintacosi120-xuvc.svg"
                    alt="AustinTacosI120"
                    className="frame-homepagewiththesearchbarandthetotallistofclu-austin-tacos"
                  />
                </div>
              </Link>

            </div>
            <Stack flexDirection={"row"}>
              <Box mr={1}>
                <img
                  src="/playground_assets/image2i120-7k5g-200h.png"
                  alt="image2I120"
                  className="frame-homepagewiththesearchbarandthetotallistofclu-image2"
                />
              </Box>
              <Box >
                <Typography sx={loginFont} component={'div'}>
                  <Box sx={{ cursor: "pointer" }} onClick={handleLogin}>
                    {user ? "Elogix Software Pvt. Ltd." : "Log In / Sign Up"}
                  </Box>
                </Typography>
                <Typography sx={smallFont} component={'div'}>{user ? "PRADIP CHANDA" : "To unlock full access"}</Typography>
              </Box>
            </Stack>
          </Stack>
          <Switch>
            <Route exact path="/">
              <HomeDetails />
            </Route>
            <Route exact path="/search">
              <SearchView />
            </Route>
          </Switch>
        </Box>
      </Box>
    </Box>
  )
}

