import { Button, Grid, Stack } from "@mui/material"
import { SectionCard } from "."
import { buttonStyle } from "app"

export const OnlyResponsible = ({ children }) => {
    return (
      <SectionCard >
      <>
          <Grid container spacing={0} p={"1.2rem"}>



              <Grid item xs={9}>
                  <div >
                      <div className="frame-homepagewiththesearchbarandthetotallistofclu-text14">

                          <span>Only Responsible & Effective Use of AI</span>

                      </div>
                      <span className="frame-homepagewiththesearchbarandthetotallistofclu-text06" >
                          <span>The core of our algorithms utilizes expert economist and data science knowledge. Then only do we apply AI to find patterns in our analysis to generate market segments that are simple to understand.

                              <br /><br />By doing so, we’re removing the barrier for real estate professionals to access the most advanced analytics in the industry.  </span>
                      </span>

                  </div>
                  <Stack mt={1} flexDirection={"row"} justifyContent={"right"}>
                      <Button sx={buttonStyle} variant='contained'> Learn More</Button>
                  </Stack>

              </Grid>
              <Grid item xs={3}>

                  <img
                      src="/playground_assets/image6149-pvk-200h.png"
                      alt="image5144"
                      className="frame-homepagewiththesearchbarandthetotallistofclu-image3 align_right "
                  />
              </Grid>
          </Grid>

      </>
  </SectionCard>

  
    )
  }