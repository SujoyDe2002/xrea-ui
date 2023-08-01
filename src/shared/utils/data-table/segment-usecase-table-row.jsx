import { makeStyles } from "@mui/styles";
import { lighten, Stack, TableCell, TableRow, Typography } from '@mui/material'
import { AppStyle, itemTableDataCellStyleBold, itemTablePercentileStyle, itemTableStatusStyle, tableHeader, tableUseStyle } from 'app'
import React from 'react'


export const SegmentUsecaseTableRow = ({ rowData, currentDropdown }) => {
    const useStyles = makeStyles(tableUseStyle);
    const classes = useStyles();
    return (
        <>
            {rowData?.map(({ use_case_group_desc, groupData, use_case_color }, index) => {
                return (
                    <TableRow key={index}>

                        <TableCell
                            className={classes.sticky}
                            component="td"
                            align="right"
                            style={{ paddingLeft: 0, backgroundColor: "#fff" }}
                        >
                            <Typography sx={{ ...tableHeader, color: use_case_color }}>
                                {use_case_group_desc}
                            </Typography>
                        </TableCell>
                        {groupData && groupData.map(({ value, isMax }, mapIndex) => {
                            let bgcolor = isMax ? lighten(use_case_color, .90) : AppStyle.palette.common.white;
                            const {index, percentile, grade, percentileChipBgcolor, statusChipBgcolor} = value;

                            let chipBgColor = statusChipBgcolor;
                            let chipValue = grade;
                            let sx = itemTableStatusStyle
                            if (currentDropdown === "P") {
                                chipBgColor = percentileChipBgcolor;
                                chipValue = `${percentile}`;
                                sx = itemTablePercentileStyle;
                            }
                            return (
                                <TableCell key={mapIndex} align="center" >
                                    <Stack >

                                        <Stack flexDirection={"row"} justifyContent={"center"} alignItems={"center"}>

                                            <Stack
                                                flexDirection={"row"} justifyContent={"center"} alignItems={"center"}
                                                sx={{
                                                    ...itemTableDataCellStyleBold,
                                                    color: use_case_color,
                                                    padding: "10px 50px",
                                                    borderRadius: "25px",
                                                    backgroundColor: bgcolor
                                                }}>
                                                {index}
                                                <Stack
                                                 sx={{...sx,
                                                  bgcolor: chipBgColor
                                                }}
                                                  >
                                                    {chipValue}
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </TableCell>
                            )
                        })}
                    </TableRow>
                )

            })}
        </>
    )
}

