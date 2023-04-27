import { Typography } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles';




export const TableHeading = ({ heading }) => {
    const theme = useTheme();
    const headingStyle = {
        bgcolor: theme.palette.tableHeader.main,
        fontWeight: "bold",
        p: 1,
        color: "#fff"
    }

    return (
        <Typography sx={headingStyle}>{heading}</Typography>

    )
}
