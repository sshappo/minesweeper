import {Cell} from "./Cell";
import React from "react";

interface IRow {
    row: any;
    indexRow: number;
    clickCell: Function;
}

export const Row = ({row, indexRow, clickCell}: IRow) => {
    return row.map((item: string, index: number) => {
        return (
            <Cell key={index} cellIndex={index} rowIndex={indexRow} send={clickCell} item={item}/>
        );
    });
};
