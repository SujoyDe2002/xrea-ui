import { Box, Stack, TableCell, TableRow, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppStyle, boxStyle, cellSize, itemTableDataCellStyle, marketSegmentHeaderStyle, marketSegmentHeading, stickyHeaderCell, tableHeader, tableHeaderTooltipContainer, tableUseStyle } from "app";
import { TableHeading } from "modules/search";
import { SegmentUsecaseTableRow } from "./segment-usecase-table-row";
import { GetAttribute } from "..";
import TooltipHelp from "../tooltip/tooltip-help";



export const XreaTableRow = ({ rowData, noOfCol, getCityIndex, currentDropdown }) => {
    const useStyles = makeStyles(tableUseStyle);
    const classes = useStyles();
    let colRow = new Array(noOfCol).fill(null);
    const headingRow = {
        "& th": {
            p: 0
        }
    }
    return (
        <>
            {rowData && rowData.type === 1 &&
                (
                    <TableRow key={rowData.type}>
                        {
                            rowData.cols.map((v, i) => {
                                return (
                                    <TableCell
                                        key={i}
                                        align="center"
                                        className={i === 0 ? classes.sticky : classes.tabcol}
                                        style={{
                                            paddingLeft: 0,
                                            backgroundColor: "#fff",
                                            ...cellSize
                                        }}
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
                                        key={i}
                                        align="center"
                                        className={i === 0 && classes.sticky}
                                        style={{ paddingLeft: 0, backgroundColor: "#fff" }}
                                    >
                                        {i > 0 && <Box sx={boxStyle} indexid={i - 1} onClick={getCityIndex}></Box>}

                                        <Typography sx={(i === 0) ? marketSegmentHeaderStyle : marketSegmentHeading}>
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
                    <TableRow key={rowData.type} sx={{ ...headingRow, backgroundColor: AppStyle.palette.tableHeader.main }} className={classes.tabcol3}>
                        <TableCell
                            component="th"
                            scope="row"
                            colSpan={1}
                            className={classes.sticky}
                        >
                            <TableHeading heading={rowData.cols[0]} />

                        </TableCell>
                        <TableCell
                            component="th"
                            scope="row"
                            colSpan={noOfCol - 1}
                        >
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
                                    <Stack sx={tableHeaderTooltipContainer}>
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
                                                key={i}
                                                align="center"
                                                style={{ paddingLeft: 0, backgroundColor: "#fff" }}
                                            >

                                                <Typography sx={itemTableDataCellStyle}>
                                                    {v}
                                                </Typography>
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
                    <TableRow key={rowData.type} sx={{ ...headingRow, backgroundColor: AppStyle.palette.tableHeader.main }} className={classes.tabcol3} >
                        <TableCell
                            component="th"
                            scope="row"
                            colSpan={1}
                            className={classes.sticky}
                        >
                            <TableHeading heading={rowData.cols[0]} />

                        </TableCell>

                        <TableCell
                            component="th"
                            scope="row"
                            colSpan={noOfCol - 1}
                        >
                        </TableCell>

                    </TableRow>
                )}
            {rowData && rowData.type === 6 &&
                (
                    <SegmentUsecaseTableRow currentDropdown={currentDropdown} rowData={rowData.cols} />
                )}
        </>);
}