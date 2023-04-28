// import { Grid } from '@mui/material'
// import React from 'react'
// import './frame-homepagewiththesearchbarandthetotallistofclu.css'
// import SectionCard from './SectionCard'
// import { Link } from 'react-router-dom'

import { Grid } from "@mui/material"
import { SectionCard } from "."
import { Link } from "react-router-dom"

export const InfoCard = ({ children }) => {
  return (
    <SectionCard >
      <>
        <Grid container spacing={0} p={"1.2rem"}>
          <Grid item xs={9}>
            <div >
              <div className="frame-homepagewiththesearchbarandthetotallistofclu-text14">
                <span >
                  <span >
                    Instantly Characterize Markets using XREA’s breakthrough algorithms, knowledge base and
                  </span>
                  <br></br>
                  <span> AI technology.</span>
                </span>
              </div>
              <span className="frame-homepagewiththesearchbarandthetotallistofclu-text06" >
                <span>Try some sample searches:</span>
              </span>
              <div >
                <div className="frame-homepagewiththesearchbarandthetotallistofclu-emptystatesuggestion_custom">
                  <span className="frame-homepagewiththesearchbarandthetotallistofclu-text08">
                    <span>

                      <Link to={{
                        pathname: "/search", state: {
                          id: 1

                        }
                      }}>
                        Young Professionals and Couples with Young Kids analysis for
                        Peoria, IL
                      </Link>
                    </span>
                  </span>
                  {/* </div>
                <div className="frame-homepagewiththesearchbarandthetotallistofclu-emptystatesuggestion_custom"> */}
                  <span className="frame-homepagewiththesearchbarandthetotallistofclu-text08">
                    <Link to={{
                      pathname: "/search", state: { id: 2 }
                    }}>
                      <span>All Uses for Peoria, IL</span>
                    </Link>
                  </span>
                </div>
                <div className="frame-homepagewiththesearchbarandthetotallistofclu-emptystatesuggestion_custom">
                  <span className="frame-homepagewiththesearchbarandthetotallistofclu-text08">
                    <span>
                      <Link to={{
                        pathname: "/search", state: { id: 3 }
                      }}>
                        Young Professionals and Couples with Young Kids analysis in
                        multiple locations
                      </Link>
                    </span>
                  </span>
                </div>
              </div>
            </div>

          </Grid>
          <Grid item xs={3}>

            <img
              src="/playground_assets/search.svg"
              alt="image3124"
              className="frame-homepagewiththesearchbarandthetotallistofclu-image3 align_right"
            />
          </Grid>


        </Grid>

      </>
    </SectionCard>

  )
}
