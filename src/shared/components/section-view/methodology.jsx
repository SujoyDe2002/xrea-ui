import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import { SectionCard } from "."
import { useTheme } from '@mui/material/styles';
import { buttonStyle,xreDes, xreaBgStyle,barImgContainer,iconContainer,smallTextStyle,xreaTitleStyle,xreaButtonContainer } from "app";

export const Methodology = ({ children }) => {

    const theme = useTheme();
    const iconStyle = {
        color: theme.palette.primary.main,
        fontSize: "3rem"
    }
    return (

        <Box sx={xreaBgStyle}>
            <Grid container spacing={"1.2rem"} >
                <Grid item xs={12} md={9}>
                    <div >
                        <div className="frame-homepagewiththesearchbarandthetotallistofclu-text14">

                            <Typography sx={xreaTitleStyle} >XREA methodology</Typography>

                        </div>
                        <Typography sx={xreDes}>
                            Newest data, sharpest insights,
                            greatest detail.
                        </Typography>

                    </div>
                    <Stack sx={{ ...xreaButtonContainer, display: { xs: "none", md: "flex" } }}>
                        <Button sx={buttonStyle} variant='contained' > Learn More</Button>
                    </Stack>

                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack flexDirection={"row"} alignItems={"end"}>
                        <Box sx={barImgContainer}>
                            <img
                                src="/playground_assets/greenbar1.svg"
                                alt="image5144"
                                className="img-width"
                            />
                        </Box>
                        <Box sx={barImgContainer}>

                            <img
                                src="/playground_assets/greenbar2.svg"
                                alt="image5144"
                                className="img-width" />
                        </Box>
                        <Box sx={barImgContainer}>
                            <Stack sx={iconContainer} alignItems={"center"}>
                                        <img
                                        src="/playground_assets/star.svg"
                                        alt="image5144"
                                        className="img-width"
                                    />
                                <Typography sx={smallTextStyle} >
                                    TOP-rated
                                    by XREA
                                </Typography>
                            </Stack>
                            <img
                                src="/playground_assets/greenbar3.svg"
                                alt="image5144"
                                className="img-width"
                            />
                        </Box>


                    </Stack>
                    <Stack sx={{ ...xreaButtonContainer, display: { xs: "flex", md: "none" } }}>
                        <Button sx={{ ...buttonStyle, width: "fit-content" }} variant='contained' > Learn More</Button>
                    </Stack>
                </Grid>


            </Grid>

        </Box>


    )
}