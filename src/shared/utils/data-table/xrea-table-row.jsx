import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { boxStyle, marketSegmentHeading, tabStyle, tableCell } from "app";
import { TableHeading } from "modules/search";


const useStyles = makeStyles({
    table: {
        minWidth: 650
    },
    sticky: {
        position: "sticky",
        left: 0
    },
    tabcol: {
        borderRadius: "5px 5px 0px 0px",
        boxShadow: "2px 0px 10px 0px #eeeeee",
        margin: "0px 5px 0px 5px"
    },
    tabcol1: {
        borderRadius: "5px 5px 0px 0px",
        boxShadow: "2px 0px 10px 0px #eeeeee"
    },
    tabcol3: {
        backgroundColor: "#1ca2aa"
    }
});

export const XreaTableRow = ({ rowData }) => {
    const classes = useStyles();
    return (<>
        {rowData.type === 1 &&
            (
                <TableRow key={rowData.name}>
                    <TableCell
                        className={classes.sticky}
                        component="th"
                        scope="row"
                    >
                        {rowData.catg_name}
                    </TableCell>
                    <TableCell align="center">
                        <Box sx={tabStyle}>
                            {/* {rowData.catg_value1} */}
                        </Box>
                    </TableCell>
                    <TableCell align="center">
                        <Box sx={tabStyle}>
                            {/* {rowData.catg_value1} */}
                        </Box></TableCell>
                    {/* <TableCell align="center" className={classes.tabcol}>{rowData.catg_value2}</TableCell>
                    <TableCell align="center" className={classes.tabcol}>{rowData.type}</TableCell> */}
                </TableRow>
            )}
        {rowData.type === 2 &&
            (
                <TableRow key={rowData.name} >
                    <TableCell
                        className={classes.sticky}
                        component="th"
                        scope="row"
                        align="right"
                    >
                        {rowData.catg_name}
                    </TableCell>
                    <TableCell align="center">
                        <Box sx={tableCell}>
                            <Box>
                                <Box sx={boxStyle}></Box>
                                <Typography sx={marketSegmentHeading}>{rowData.catg_value1}</Typography>
                            </Box>
                        </Box>
                    </TableCell>
                    <TableCell align="center">
                        <Box sx={tableCell}>
                            <Box>
                                <Box sx={boxStyle}></Box>
                                <Typography sx={marketSegmentHeading}>{rowData.catg_value1}</Typography>
                            </Box>
                        </Box>
                    </TableCell>
                    {/* <TableCell align="right">{rowData.catg_value2}</TableCell>
                    <TableCell align="right">{rowData.type}</TableCell> */}
                </TableRow>
            )}
        {rowData.type === 3 &&
            (
                <TableRow key={rowData.name} className={classes.tabcol3}>
                    <TableCell
                        className={classes.sticky}
                        component="th"
                        scope="row"
                        colSpan={5}
                    >
                        <TableHeading heading={rowData.catg_name} />

                    </TableCell>

                </TableRow>
            )}
        {rowData.type === 4 &&
            (
                <TableRow key={rowData.name}>
                    <TableCell
                        className={classes.sticky}
                        component="th"
                        scope="row"
                        align="right"
                    >
                        {rowData.catg_name}
                    </TableCell>
                    <TableCell align="right">{rowData.catg_value}</TableCell>
                    <TableCell align="right">{rowData.catg_value1}</TableCell>
                    {/* <TableCell align="right">{rowData.catg_value2}</TableCell>
                    <TableCell align="right">{rowData.type}</TableCell> */}
                </TableRow>
            )}
    </>);
}