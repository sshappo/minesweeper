import React from "react";
import {MESSAGE_OPEN} from "./constants";

interface ICell {
    cellIndex: number;
    rowIndex: number;
    send: Function;
    item: string;
}

export const Cell = React.memo(({cellIndex, rowIndex, send, item}: ICell) => {
        const clickThisCell = () => {
            send(`${MESSAGE_OPEN} ${cellIndex} ${rowIndex}`);
        };

        return <td className="cell" onClick={clickThisCell}>{item}</td>
    },
    (prevProps: ICell, nextProps: ICell) => prevProps.item === nextProps.item
);
