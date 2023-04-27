import { Box, Grid, Stack, Typography } from '@mui/material'
import { boxContainer, searchResultSection } from 'app'
import React from 'react'
import { SectionSearchCard } from 'shared/utils'
const headerstyle = {
    fontfamily: "IBM Plex Sans",
    fontstyle: "normal",
    fontweight: "700",
    lineheight: "107.5%",
    padding: "0px 10px 0px 10px"
}
const iconboxstyle = {
    position: "relative",
    width: "fit-content",
    mx: "auto"
}
const iconValue = {
    position: "absolute",
    color: "#fff",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize:"26px"

}
const typography = {
    fontfamily: "IBM Plex Sans",
    fontsize: "20px",
    fontweight: "400",
    lineheight: "22px",
    letterspacing: "0px",
    textalign: "left"

}
export const MarketSegmentView = ({ props }) => {
    const { marketSegmentData, setMarketSegmentData } = props;
    const { cityName, tenYearPopGrowthRate, medianIncome, homePToIncome } = marketSegmentData
    const handleClick = () => {

        setMarketSegmentData(null);
    }
    return (

        <SectionSearchCard>
            <Box sx={boxContainer}>

                <Box onClick={handleClick}><Typography sx={{...headerstyle, cursor: "pointer"}}>  {"< Back to Search"} </Typography></Box>
                <Stack mt={5} flexDirection={"row"} justifyContent={"space-between"} width={"100%"}>
                    <Typography variant='h2' sx={searchResultSection}>Market Segment in {cityName}</Typography>
                    <Typography sx={headerstyle} fontWeight={"bold"} color={"#A9A9A9"} fontSize={"36px"}  textAlign={"right"}>90</Typography>
                </Stack>
            </Box>
    
            <Stack direction="row" justifyContent={"center"} spacing={2} sx={{ padding: "20px 20px 30px 20px", width: "100%" }}>
                <div>
                    <Box sx={iconboxstyle}>
                        <img
                            src="/playground_assets/pentagon.svg"
                            alt="pentagon"
                            className='icon'

                        />
                        <Typography sx={iconValue} >{tenYearPopGrowthRate}</Typography>
                    </Box>
                    <Typography>10-year population growth</Typography>
                </div>
                <div>
                    <Box sx={iconboxstyle}>
                        <img
                            src="/playground_assets/square.svg"
                            alt="square"
                            className='icon'
                        />
                        <Typography sx={iconValue} >{homePToIncome}</Typography>
                    </Box>
                    <Typography>Home Price to Income Ratio</Typography>
                </div>
                <div>
                    <Box sx={iconboxstyle}>
                        <img
                            src="/playground_assets/octagon.svg"
                            alt="octagon"
                            className='icon'

                        />
                        <Typography sx={iconValue} >{medianIncome}</Typography>
                    </Box>
                    <Typography>Median Income</Typography>
                </div>
            </Stack>
            <br></br>
            <Stack>
                <Grid >
                    <Typography sx={typography}>
                        tdustry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </Typography>
                </Grid>
            </Stack>
        </SectionSearchCard>


    )
}
