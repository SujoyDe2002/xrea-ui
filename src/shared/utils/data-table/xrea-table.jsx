import React from "react";
import { makeStyles } from "@mui/styles";
import {TableContainer, TableBody, Table} from "@mui/material";
import { XreaTableRow } from "./xrea-table-row";


const useStyles = makeStyles({
    table: {
        minWidth: 650
    }
});

function createData(
    catg_name,
    catg_value,
    catg_value1,
    catg_value2,
    type
) {
    return { catg_name, catg_value, catg_value1, catg_value2, type };
}

const rows = [
    createData("", "Ayer CDP Massachusetts", "Ayr Village,,Nebaraska", "Value test", 1),
    createData("Market Segment", "Market Segment1", "Market Segment2", "", 2),
    createData("General Statistics", "", "", "", 3),
    createData("Cupcake", 305, 3.7, 67, 4),
    createData("Gingerbread", 356, 16.0, 49, 4),
    createData("Jhinku bubu Statistics", "", "", "", 3),
    createData("Cupcake", 305, 3.7, 67, 4),
    createData("Gingerbread", 356, 16.0, 49, 4)
];

export const XreaTable = () => {
    const classes = useStyles();

    return (
        <TableContainer style={{ paddingTop: "2px" }}>
            <Table
                className={classes.table}
                aria-label="simple table"
                style={{ tableLayout: "fixed" }}
            >
                <TableBody>
                    {rows.map((row) => (
                        <XreaTableRow key={row.name} rowData={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}