import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { TableContainer, TableBody, Table } from "@mui/material";
import { XreaTableRow } from "./xrea-table-row";


const useStyles = makeStyles({
    table: {
        minWidth: 650
    }
});

function createData(
    catg_name,
    catg_values,
    type
) {
    return { catg_name, catg_values, type };
}


export const XreaTable = ({ rows, getCityIndex, currentDropdown }) => {
    const classes = useStyles();
    const collength = Math.max(...rows.map(el => el['cols'] && el.type == 1 && el['cols'].length));
    return (
        <TableContainer style={{ paddingTop: "2px" }}>
            <Table
                className={classes.table}
                aria-label="simple table"
                style={{ tableLayout: "fixed" }}
            >
                <TableBody>

                    {
                        rows && Array.isArray(rows) && rows.length>0 && rows.map((row, index) => (
                            <XreaTableRow key={index} rowData={row} noOfCol={collength} getCityIndex={getCityIndex} currentDropdown={currentDropdown} />
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}