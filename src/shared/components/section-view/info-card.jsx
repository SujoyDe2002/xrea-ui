// import { Grid } from '@mui/material'
// import React from 'react'
// import './frame-homepagewiththesearchbarandthetotallistofclu.css'
// import SectionCard from './SectionCard'
// import { Link } from 'react-router-dom'

import { Box, Grid, Stack, Typography } from "@mui/material"
import { SectionCard } from "."
import { InfoSearch, cardImageContainer,  homeCardHeading1, imageBox, infoCardImageGrid, infoDes, savedSeacrhCriteria } from "app"
import { GetAttribute } from "shared/utils"
import { useContext } from "react"
import { LoadingContext } from "store2/loading-context-provider"

export const InfoCard = ({ children }) => {
  const { handleSpecificSearchResponse } = useContext(LoadingContext);
  const handleGuestSearch = (element) => {
    const searchtype = "GUEST";
    const searchId = GetAttribute(element, "searchId");
    handleSpecificSearchResponse(searchId, searchtype);
  }
  return (
    <SectionCard >
      <>
        <Grid container spacing={0}>
          <Grid item xs={12} md={9}>
            <Box >
              <Typography sx={homeCardHeading1}>
                Instantly Characterize Markets using XREA’s breakthrough algorithms, knowledge base and AI technology.
              </Typography>
              <Box sx={{ display: { xs: "none", md: "block" } }}>

                <Typography sx={InfoSearch}>
                  Try some sample searches:
                </Typography>

                <div >
                  <div className="frame-homepagewiththesearchbarandthetotallistofclu-emptystatesuggestion_custom">
                    <Typography sx={savedSeacrhCriteria} >
                      <span>

                      
                        <Box searchId={1} onClick={handleGuestSearch}>
                          Young Professionals and Couples with Young Kids analysis for
                          Peoria, IL
                        </Box>
                      </span>
                    </Typography>
                    {/* </div>
                <div className="frame-homepagewiththesearchbarandthetotallistofclu-emptystatesuggestion_custom"> */}
                    <Typography sx={savedSeacrhCriteria} >
                      <Box searchId={2} onClick={handleGuestSearch}>
                        <span>All Uses for Peoria, IL</span>
                      </Box>
                    </Typography>
                  </div>
                  <div className="frame-homepagewiththesearchbarandthetotallistofclu-emptystatesuggestion_custom">
                    <Typography sx={savedSeacrhCriteria} >
                      <span>
                        <Box searchId={3} onClick={handleGuestSearch}>
                          Young Professionals and Couples with Young Kids analysis in
                          multiple locations
                        </Box>
                      </span>
                    </Typography>
                  </div>
                </div>
              </Box>
              <Box sx={{ display: { xs: "block", md: "none" } }}>
                <Typography sx={infoDes}>
                  We take pertinent demand and supply data, and apply econometric techniques and real estate expertise to deliver decision-ready insights.
                </Typography>
                <Typography sx={infoDes}>
                  We’ve aggregated the highest quality data and applied our algorithms on nearly every city and zip-code in the United States.
                </Typography>
              </Box>
            </Box>

          </Grid>
          <Grid sx={infoCardImageGrid} item md={3}>

            <Stack sx={cardImageContainer}>
              <Box sx={imageBox}>

                <img
                  src="/playground_assets/search.svg"
                  alt="image3124"
                  className="frame-homepagewiththesearchbarandthetotallistofclu-image3 align_right"
                />
              </Box>
            </Stack>
          </Grid>


        </Grid>

      </>
    </SectionCard>

  )
}
