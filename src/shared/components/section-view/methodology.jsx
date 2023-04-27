import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import { SectionCard } from "."
import { useTheme } from '@mui/material/styles';
import { Star } from "@mui/icons-material";
import { buttonStyle, cardstyle } from "app";


const xreaStyle = {
    fontStyle: "normal",
    fontWeight: 700,
}
const xreaBgStyle = {
    padding: "1.25rem 1.8rem",
    boxShadow: "0px -4px 17px -3px rgba(0, 0, 0, 0.15)",
    bgcolor: "#E8F3FD"
}
const barImgContainer = {
    width: "80%",
    position: "relative"
}
const iconContainer = {
    position: "absolute",
    top: "-1.195rem",
    transform: "translateX(50%)",
    right: "50%"
}
const smallTextStyle = {
    fontSize:".5rem",
    color: "#fff",
    textAlign: "center"
}

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
                                <div className="frame-homepagewiththesearchbarandthetotallistofclu-text14">

                                    <Typography sx={xreaStyle} >XREA METHODOLOGY</Typography>

                                </div>
                                <span className="frame-homepagewiththesearchbarandthetotallistofclu-text06" >
                                    <span>Newest data, sharpest insights,
                                        greatest detail.
                                      </span>
                                </span>

                            </div>
                            <Stack flexDirection={"row"} mt={1} justifyContent={"left"}>
                                <Button sx={buttonStyle} variant='contained' > Learn More</Button>
                            </Stack>

                        </Grid>
                        <Grid item xs={3}>
                            <Stack flexDirection={"row"} alignItems={"end"}>
                                <Box sx={barImgContainer}>
                                    <img
                                        src="/playground_assets/rectangle31157-1rc-200w.png"
                                        alt="image5144"
                                        className="img-width"
                                    />
                                </Box>
                                <Box sx={barImgContainer}>

                                    <img
                                        src="/playground_assets/rectangle30158-3jon-200w.png"
                                        alt="image5144"
                                        className="img-width" />
                                </Box>
                                <Box sx={barImgContainer}>
                                    <Stack sx={iconContainer} alignItems={"center"}>
                                        <Star sx={iconStyle} />
                                        <Typography sx={smallTextStyle} >
                                            TOP-rated
                                            by XREA
                                        </Typography>
                                    </Stack>
                                    <img
                                        src="/playground_assets/rectangle29159-vmq-200w.png"
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