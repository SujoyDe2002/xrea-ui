import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { blankTableCell, tableCell, tableHeader, tableRow,boxStyle ,marketSegmentHeading} from 'app';


// const itemTableCellStyle = {
//     fontWeight: 600,
//     fontSize: 14
// }
// const itemTableHeaderCellStyle = {
//     fontWeight: 700,
//     fontSize: "24px",
//     width: "25%",
//     textAlign: "right"
// }

export function MarketSegmentRow({ marketSegmentProps }) {
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