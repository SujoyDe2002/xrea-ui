import * as React from 'react';
import { blankTableCell, itemTableDataCellStyle, itemTableDataCellStyleBold, tableCell, tableHeader, tableRow } from 'app';
import { Box, Stack, Typography } from '@mui/material';




export function UseCaseTable({ rows }) {
  const { data, label } = rows;
  console.log("label", label);

  return (
    <Box>
      {label.map((labelName, index) => {
        let { use_case_group_desc, use_case_group, use_case_color } = labelName;
        return (
          <Stack sx={tableRow}>
            <Box sx={tableHeader}>
              {use_case_group_desc}
            </Box>
            {data.map((row, index) => {
              const maxValuStyle = {
                ...itemTableDataCellStyleBold,
                color: use_case_color,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                position: "absolute",
                zIndex: 3,
                opacity: 1
              }
              const othesValueStyle = {
                ...itemTableDataCellStyle,
                color: use_case_color
              }
              return (

                <Box key={index} sx={tableCell}>
                  {use_case_group === row.max ?
                    <>
                      <Box sx={{ borderRadius: "15px", height: "85px",width: "180px",bgcolor: use_case_color, opacity: "0.1" }}> </Box>
                      <Typography sx={maxValuStyle}>
                        {row[use_case_group]}
                      </Typography>
                    </>
                    :
                    <Typography sx={othesValueStyle}>
                      {row[use_case_group]}
                    </Typography>}


                </Box>
              )
            })}
            <Box sx={blankTableCell}></Box>
          </Stack>
        )
      })}

    </Box>
  );
}