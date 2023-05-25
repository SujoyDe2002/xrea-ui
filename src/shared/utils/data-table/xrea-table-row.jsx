import { Box, Stack, TableCell, TableRow, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { boxStyle, itemTableDataCellStyle, marketSegmentHeading, stickyHeaderCell, tableHeader } from "app";
import { TableHeading } from "modules/search";
import { SegmentUsecaseTableRow } from "./segment-usecase-table-row";
import { GetAttribute } from "..";
import TooltipHelp from "../tooltip/tooltip-help";


const useStyles = makeStyles({
    table: {
        minWidth: 650
    },
    sticky: {
        position: "sticky",
        left: 0
    },
    tabcol: {
        padding: "16px",
        border: "5px solid #fff",
        borderRadius: "10px 10px 0px 0px",
        boxShadow: "0px -3px 17px -3px rgba(0, 0, 0, 0.1) inset",
        fontWeight: 700
    },
    tabcol1: {
        borderRadius: "5px 5px 0px 0px",
        boxShadow: "2px 0px 10px 0px #eeeeee"
    },
    tabcol3: {
        backgroundColor: "#1ca2aa"
    }
});
export const XreaTableRow = ({ rowData, noOfCol, getCityIndex }) => {
    const classes = useStyles();
    let colRow = new Array(noOfCol).fill(null);
    const headingRow = {
        "& th": {
            p: 0
        }
    }
    const test = "The United States Home Price to Income Ratio for 2021 is Roughly 3.54"
    return (
        <>
            {rowData && rowData.type === 1 &&
                (
                    <TableRow key={rowData.type}>
                        {
                            rowData.cols.map((v, i) => {
                                console.log("vasfasdf", v);
                                return (
                                    <TableCell
                                        align="center" className={i === 0 ?
                                            classes.sticky : classes.tabcol}
                                        style={{ width: '350px', paddingLeft: 0, backgroundColor: "#fff" }}
                                    >
                                        <Typography sx={marketSegmentHeading}>{v}</Typography>
                                    </TableCell>
                                )
                            })
                        }

                    </TableRow>
                )}
            {rowData && rowData.type === 2 &&
                (
                    <TableRow className={classes.sticky} sx={stickyHeaderCell} key={rowData.type} >
                        {
                            colRow.map((v, i) => {
                                return (

                                    <TableCell
                                        align="center"
                                        className={i === 0 && classes.sticky}
                                        style={{ width: '350px', paddingLeft: 0, backgroundColor: "#fff" }}
                                    >
                                        {i > 0 && <Box sx={boxStyle} indexid={i - 1} onClick={getCityIndex}></Box>}
                                        <Typography sx={marketSegmentHeading}>
                                            {rowData.cols[i]}
                                        </Typography>
                                    </TableCell>
                                )
                            })

                        }
                    </TableRow>
                )}
            {rowData && rowData.type === 3 &&
                (
                    <TableRow key={rowData.type} sx={headingRow} className={classes.tabcol3}>
                        <TableCell
                            component="th"
                            scope="row"
                            colSpan={noOfCol}
                        >
                            <TableHeading heading={rowData.cols[0]} />

                        </TableCell>
                    </TableRow>
                )}
            {rowData && rowData.type === 4 &&
                (
                    rowData.cols && rowData.cols.map(({ tableHeaderTitle, toolTip, groupData }, index) => {
                        return (

                            <TableRow key={index} >
                                <TableCell
                                    align="center"
                                    className={classes.sticky}
                                    style={{ paddingLeft: 0, backgroundColor: "#fff" }}
                                >
                                    <Stack alignItems={"center"} sx={{width: "320px"}} ml={1} flexDirection={"row"}>
                                        <Typography sx={tableHeader}>
                                            {tableHeaderTitle}
                                        </Typography>

                                        <TooltipHelp
                                            title={toolTip}

                                        />
                                    </Stack>
                                </TableCell>
                                {

                                    groupData.map((v, i) => {

                                        return (

                                            <TableCell
                                                align="center"
                                                style={{ paddingLeft: 0, backgroundColor: "#fff" }}
                                            >

                                                <Typography sx={itemTableDataCellStyle}>
                                                    {v}
                                                </Typography>



                                                {/* <Typography sx={i === 0 ? tableHeader : itemTableDataCellStyle}>
                                        {rowData.cols[i]}
                                    </Typography> */}
                                                {/* <Typography sx={i === 0 ? tableHeader : itemTableDataCellStyle}>
                                        {rowData.cols[i]}
                                    </Typography> */}
                                            </TableCell>
                                        )
                                    })

                                }
                            </TableRow>
                        )
                    })
                )}
            {rowData && rowData.type === 5 &&
                (
                    <TableRow key={rowData.type} sx={headingRow} className={classes.tabcol3}>
                        <TableCell
                            component="th"
                            scope="row"
                            colSpan={noOfCol}
                        >
                            <TableHeading heading={rowData.cols[0]} />

                        </TableCell>
                    </TableRow>
                )}
            {rowData && rowData.type === 6 &&
                (
                    <SegmentUsecaseTableRow rowData={rowData.cols} />
                )}
        </>);
}