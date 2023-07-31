import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  tableCell,
  tableRow,
  boxStyle,
  marketSegmentHeading
} from "app";

export const MarketSegmentRow = () => {

  
  return (
    <Stack sx={tableRow}>
      {data.map((row, index) => {
        return (
          <Box key={index} sx={tableCell}>
            <Box>
              <Box sx={boxStyle} indexid={index} ></Box>
              <Typography sx={marketSegmentHeading}>
                {"Market"}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
};
