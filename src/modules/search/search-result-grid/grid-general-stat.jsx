import * as React from 'react';
import { blankTableCell, itemTableDataCellStyle, tableCell, tableHeader, tableRow } from 'app';
import { Box, Stack, Typography } from '@mui/material';




export default function GeneralStat({ rows }) {
    const { data, label } = rows;
    return (

        <Box>
            <Stack sx={tableRow}>
                <Box sx={tableHeader}>
                    {"10 year population growth"}
                </Box>
                {data.map((row, index) => {
                    return (

                        <Box key={index} sx={tableCell}>
                            <Typography sx={itemTableDataCellStyle}>
                                {row.tenYearPopGrowthRate}
                            </Typography>
                        </Box>
                    )
                })}
                <Box sx={blankTableCell}></Box>

            </Stack>
            <Stack sx={tableRow}>
                <Box sx={tableHeader}>
                    {"Home Price to Income Ratio"}
                </Box>
                {data.map((row, index) => {
                    return (

                        <Box key={index} sx={tableCell}>
                            <Typography sx={itemTableDataCellStyle}>
                                {row.homePToIncome}
                            </Typography>
                        </Box>
                    )
                })}
                <Box sx={blankTableCell}></Box>

            </Stack>
            <Stack sx={tableRow}>
                <Box sx={tableHeader}>
                    {"Median Income"}
                </Box>
                {data.map((row, index) => {
                    return (

                        <Box key={index} sx={tableCell}>
                            <Typography sx={itemTableDataCellStyle}>
                                {row.medianIncome}
                            </Typography>
                        </Box>
                    )
                })}
                <Box sx={blankTableCell}></Box>


            </Stack>
        </Box>
    )
}