import {useWebsocket} from "./useWebsocket";
import React, {ChangeEvent} from "react";
import {parseMap} from "./ParseMap";
import {Row} from "./Row";
import {
    MESSAGE_MAP,
    MESSAGE_NEW,
    NAME_MAP,
    NAME_OPEN_LOSE,
    YOU_LOSE_MESSAGE
} from "./constants";

export const App = () => {
    const [message, sendMessage, readyState] = useWebsocket();
    const [parsedData, sendParsedData] = React.useState([]);
    const [gameLevel, setGameLevel] = React.useState(1);

    React.useEffect(() => {
        if (readyState === 1) {
            sendMessage(MESSAGE_MAP);
        }
        const parsedMessage = parseMap(message);
        if (parsedMessage.name === NAME_MAP) {
            sendParsedData(parsedMessage.data);
        }
        if (parsedMessage.name === NAME_OPEN_LOSE) {
            alert(YOU_LOSE_MESSAGE);
        }
    }, [message]);

    const playAgainHandler = () => {
        sendMessage(`${MESSAGE_NEW} ${gameLevel}`)
    };
    const levelHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setGameLevel(+value);
    };

    return (
        <div className="app">
            <div className="radio-buttons">
                <div>
                    <input id="level-1" type="radio" name="game-level" value={1} defaultChecked={gameLevel === 1}
                           onChange={levelHandler}/><label htmlFor="level-1">Level 1</label>
                </div>
                <div>
                    <input id="level-2" type="radio" name="game-level" value={2} defaultChecked={gameLevel === 2}
                           onChange={levelHandler}/><label htmlFor="level-2">Level 2</label>
                </div>
                <div>
                    <input id="level-3" type="radio" name="game-level" value={4} defaultChecked={gameLevel === 3}
                           onChange={levelHandler}/><label htmlFor="level-3">Level 3</label>
                </div>
                <div>
                    <input id="level-4" type="radio" name="game-level" value={3} defaultChecked={gameLevel === 4}
                           onChange={levelHandler}/><label htmlFor="level-4">Level 4</label>
                </div>
                <input type="button" id="play-again" value="play-again" onClick={playAgainHandler}/>
            </div>

            <table className="app-table">
                <tbody>
                {parsedData.map((item: Array<string>, index: number) =>
                    <tr key={index}>
                        <Row key={index} indexRow={index} row={item} clickCell={sendMessage}/>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
};
