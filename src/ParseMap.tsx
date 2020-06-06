import {CLOSED_FIELD} from "./constants";

export interface IParser {
    name: string;
    data: Array<Array<string>>;
}

export function parseMap(map: string): IParser {
    const rows = map.split('\n');
    const name = rows.shift();

    return {
        name,
        data: rows.map((row: string) => {
            return row.split('').map((item: string) => {
                return item === CLOSED_FIELD ? '' : item;
            });
        })
    };
}
