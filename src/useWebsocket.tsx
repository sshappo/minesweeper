import React, {useEffect, useState} from 'react';
import {
    MESSAGE_NEW_1,
    WSS_EVENT_CLOSE,
    WSS_EVENT_MESSAGE,
    WSS_EVENT_OPEN,
    WSS_URL
} from "./constants";

let ws = new WebSocket(WSS_URL);

export const useWebsocket = () => {
    const [message, setMessage] = useState('');

    const onOpen = () => ws.send(MESSAGE_NEW_1);
    const onClose = () => {/*console.log("ws closed")*/
    };
    const onMessage = (e: MessageEvent) => setMessage(e.data);

    ws.addEventListener(WSS_EVENT_OPEN, onOpen);
    ws.addEventListener(WSS_EVENT_CLOSE, onClose);

    useEffect(() => {
        return () => {
            ws.close();
            ws.removeEventListener(WSS_EVENT_OPEN, onOpen);
            ws.removeEventListener(WSS_EVENT_CLOSE, onClose);
        };
    }, []);

    useEffect(() => {
        if (!ws) return;

        ws.addEventListener(WSS_EVENT_MESSAGE, onMessage);
        return () => {
            ws.removeEventListener(WSS_EVENT_MESSAGE, onMessage);
        };

    }, [message]);

    return [message, ws.send.bind(ws), ws.readyState]
};
