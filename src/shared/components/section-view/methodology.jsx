import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import { SectionCard } from "."
import { useTheme } from '@mui/material/styles';
import { Star } from "@mui/icons-material";
import { buttonStyle, cardstyle,xreaMethodologyStyle,xreaBgStyle,barImgContainer,iconContainer,smallTextStyle } from "app";


export const Methodology = ({ children }) => {
   
        const theme = useTheme();
        const iconStyle = {
            color: theme.palette.primary.main,
            fontSize: "3rem"
        }
        return (
            
                <Box sx={xreaBgStyle}>
                    <Grid container spacing={0} p={"1.2rem"}>
                        <Grid item xs={9}>
                            <div >
                                <div>

                                    <Typography sx={xreaMethodologyStyle} >XREA METHODOLOGY</Typography>

                                </div>
                                <Typography  >
                                    <span>Newest data, sharpest insights,<br/> greatest detail.
                                      </span>
                                </Typography>

                            </div>
                            <Stack flexDirection={"row"} mt={1} justifyContent={"left"}>
                                <Button sx={buttonStyle} variant='contained' > Learn More</Button>
                            </Stack>

                        </Grid>
                        <Grid item xs={3}>
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
                        </Grid>
                    </Grid>
                </Box>
        )
    }