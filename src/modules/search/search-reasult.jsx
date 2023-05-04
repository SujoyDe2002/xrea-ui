import { React, useRef } from 'react'
import { SectionSearchCard } from 'shared/utils'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import jsPDF from 'jspdf'
import {GeneralStat,UseCaseTable,MarketSegmentRow,TableHeading} from './search-result-grid';
import { searchResultSection, tabRight, tabStyle, tablesContainter } from 'app';


const SearchReasult = ({ searchReasultProps }) => {

  const { searchedReasult, cityNameResultList, getCityIndex } = searchReasultProps
  const { general_stat, usecase } = searchedReasult;
  const theme = useTheme();
  const secondarybtn = {
    textTransform: "none",
    bgcolor: theme.palette.secondary.main,
    fontWeight: 700,
    fontSize: "1.125rem",
    lineHeight: "107.5%"
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

    rowLength: general_stat.data.length,
    getCityIndex
 }


  return (
    <SectionSearchCard>
      <Stack mt={5} flexDirection={"row"} justifyContent={"space-between"} width={"100%"} p={".5rem 1rem"}>
        <Typography variant='h2' sx={searchResultSection}>Search results</Typography>
        <Button variant='contained' disabled sx={secondarybtn} onClick={(e) => downLoadReport(e)}>Save this XREA Search</Button>
      </Stack>
      <Box ref={resultTableRef} sx={tablesContainter}>

        <Stack direction={"row"} justifyContent={"start"} spacing={2}>

          <Box sx={tabRight}></Box>
          {console.log("cityNameResultList", cityNameResultList)}
          {(cityNameResultList.map((city) => {
            return (
              <Box sx={tabStyle}>
                {city.name}
              </Box>
            )
          }))}

        </Stack>

        <MarketSegmentRow marketSegmentProps={marketSegmentProps} />
        <TableHeading heading={"GENERAL STATISTICS"} />
        <GeneralStat rows={general_stat} />
        <TableHeading heading={"USE CASE SCORE"} />
        <UseCaseTable rows={usecase} />
      </Box>
    </SectionSearchCard>)
}

export default SearchReasult
