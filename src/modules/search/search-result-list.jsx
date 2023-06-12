import { React, useRef } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import jsPDF from 'jspdf';
import { GeneralStat, UseCaseTable, TableHeading, MarketSegmentRow } from './search-result-grid';

import { lastTab, searchResultSection, tabStyle, tablesContainter } from 'app';
import { OrderXrea } from './order-xrea';
import SearchSection from './search-section';



export const ResultList = ({ searchReasultProps }) => {


    const { searchedReasult, cityNameResultList, setMarketSegmentData } = searchReasultProps
    const { generalStat, usecase } = searchedReasult;
    const theme = useTheme();
    const secondarybtn = {
        textTransform: "none",
        bgcolor: theme.palette.secondary.main,
        fontWeight: 700,
        fontSize: "1.125rem",
        lineHeight: "107.5%"
        /* or 19px */
    }
    const resultTableRef = useRef();
    const downLoadReport = (e) => {
        const doc = new jsPDF({
            orientation: 'l',
            unit: 'pt',
            format: 'letter'
        });
        doc.html(resultTableRef.current, {
            callback: function (doc) {
                doc.save();
            }
        });
    }

    const marketSegmentProps = {

        rowLength: generalStat.data.length,


    }



    return (
        <>
            <SearchSection />
            <Stack mt={5} flexDirection={"row"} justifyContent={"space-between"} width={"100%"} p={".5rem 1rem"}>
                <Typography variant='h2' sx={searchResultSection}>Search results</Typography>
                <Button variant='contained' sx={secondarybtn} onClick={(e) => downLoadReport(e)}>Save this XREA Search</Button>
            </Stack>
            <Box ref={resultTableRef} sx={tablesContainter}>

                <Stack ml={"320px"} direction={"row"} justifyContent={"start"} spacing={2}>

                    {(cityNameResultList.map((city) => {
                        return (
                            <Box sx={tabStyle}>
                                {city.name}
                            </Box>
                        )
                    }))}
                    <Box sx={lastTab}>
                        {"Add a city..."}
                    </Box>

                </Stack>


                <MarketSegmentRow marketSegmentProps={marketSegmentProps} />

                <TableHeading heading={"GENERAL STATISTICS"} />
                <GeneralStat rows={generalStat} />
                <TableHeading heading={"USE CASE SCORE"} />
                <UseCaseTable rows={usecase} />
            </Box>
            <OrderXrea />
        </>
    )
}

