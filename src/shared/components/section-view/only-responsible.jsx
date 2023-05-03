import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import { SectionCard } from "."
import { buttonStyle, cardImageContainer, homeCardDes, homeCardHeading1 } from "app"

export const OnlyResponsible = ({ children }) => {
    return (
        <SectionCard >
            <>
                <Grid container spacing={"1.2rem"}>



                    <Grid item md={9} xs={12} order={{ xs: 2, md: 1 }}>
                        <div >
                            <Typography sx={homeCardHeading1}>
                                Only Responsible & Effective Use of AI
                            </Typography>
                            <Typography sx={homeCardDes}>
                                The core of our algorithms utilizes expert economist and data science knowledge. Then only do we apply AI to find patterns in our analysis to generate market segments that are simple to understand.
                            </Typography>
                            <Typography sx={homeCardDes}>
                                By doing so, we’re removing the barrier for real estate professionals to access the most advanced analytics in the industry.
                            </Typography>


                        </div>
                        <Stack mt={1} flexDirection={"row"} justifyContent={"right"}>
                            <Button sx={buttonStyle} variant='contained'> Learn More</Button>
                        </Stack>

                    </Grid>
                    <Grid item md={3} xs={12} order={{ xs: 1, md: 2 }}>
                        <Stack sx={cardImageContainer}>
                            <Box>
                                <img
                                    src="/playground_assets/image6149-pvk-200h.png"
                                    alt="image5144"
                                    className="frame-homepagewiththesearchbarandthetotallistofclu-image3 align_right "
                                />
                            </Box>

                        </Stack>
                    </Grid>
                </Grid>

            </>
        </SectionCard>


    )
}