import { Button, Grid, Stack } from "@mui/material"
import { SectionCard } from "."
import { buttonStyle } from "app"


export const InsightCard = ({ children }) => {
    return (
      <SectionCard >
      <>
          <Grid container spacing={0} p={"1.2rem"}>

              <Grid item xs={3}>

                  <img
                      src="/playground_assets/image5144-lpgn-200h.png"
                      alt="image5144"
                      className="frame-homepagewiththesearchbarandthetotallistofclu-image3"
                  />
              </Grid>

              <Grid item xs={9}>
                  <div >
                      <div className="frame-homepagewiththesearchbarandthetotallistofclu-text14">

                          <span>View Insights, Not 100’s of Disparate Data Points</span>

                      </div>
                      <span className="frame-homepagewiththesearchbarandthetotallistofclu-text06" >
                          <span>We take pertinent demand and supply data, and apply econometric techniques and real estate expertise to deliver decision-ready insights.
                              <br /><br />We’ve aggregated the highest quality data and applied our algorithms on nearly every city and zip-code in the United States.</span>
                      </span>

                  </div>
                  <Stack mt={1} flexDirection={"row"} justifyContent={"right"}>
                      <Button sx={buttonStyle} variant='contained'> Learn More</Button>
                  </Stack>

              </Grid>
          </Grid>

      </>
  </SectionCard>
  
    )
  }