import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Stack, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { blankTableCell, cellSize, tableCell, tableHeader, tableRow } from 'app';


const itemTableCellStyle = {
    fontWeight: 600,
    fontSize: 14
}
const itemTableHeaderCellStyle = {
    fontWeight: 700,
    fontSize: "24px",
    width: "25%",
    textAlign: "right"
    //     font-size: 24px;
    // line-height: 107.5%;
}
const boxStyle = {
    width: "61px",
    height: "61px",
    background: "#D9D9D9",
    margin: "auto",
    cursor: "pointer"
}
const marketSegmentHeading = {
    fontStyle: "italic",
    fontWeight: 700,
    fontSize: "20px",
    lineHeight: "107.5%",
    mt: 1
}
export default function MarketSegmentRow({ marketSegmentProps }) {
    const { setMarketSegmentData, rowLength, getCityIndex } = marketSegmentProps;
    const history = useHistory();

    console.log("rowLengthff", rowLength);
    return (
        <Stack sx={tableRow}>

            <Box sx={tableHeader}>
                {"Market Segment"}
            </Box>
            {new Array(rowLength).fill(null).map((element, index) => {
                return (

                    <Box key={index} sx={tableCell}>
                        <Box>
                            <Box sx={boxStyle}  indexId={index} onClick={getCityIndex}></Box>
                            <Typography sx={marketSegmentHeading}>Market Segment {index + 1}</Typography>
                        </Box>
                    </Box>
                )
            })}
            <Box sx={blankTableCell}></Box>
        </Stack>
        // <Table sx={{ minWidth: 650 }} aria-label="simple table">

        //     <TableBody>

        //         <TableRow
        //             // key={rows[0].name}
        //             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        //         >
        //             <TableCell component="th" scope="row" sx={itemTableHeaderCellStyle}>
        //                 {"Market Segment"}
        //             </TableCell>
        //             {/* {data.map((row, index) => ( */}

        //             {/* {new Array(rowLength).map((index)=>{ */}
        //             {new Array(rowLength).fill(null).map((element, index) => {
        //                 return (

        //                     <TableCell align="center" >
        //                         <Box sx={boxStyle} key={index} onClick={getCityIndex}></Box>
        //                         <Typography sx={marketSegmentHeading}>Market Segment {index + 1}</Typography>
        //                     </TableCell>
        //                 )
        //             })}
        //             {/* ))} */}
        //         </TableRow>

        //     </TableBody>
        // </Table>

    );
}