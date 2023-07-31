import { Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";

export const TableHeading = ({ heading }) => {
  const theme = useTheme();
  const headingStyle = {
    fontWeight: 700,
    p: 1,
    color: "#fff",
    fontSize: "1.5rem",
    fontFamily: theme.typography.secondaryFont,
  };

  return <Typography sx={headingStyle}>{heading}</Typography>;
};
