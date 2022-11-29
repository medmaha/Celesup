import React, { useEffect, useState } from "react"
import { CELESUP_BASE_URL } from "../axiosInstances"

export default function useWebSocketHook() {
    const [socket, setSocket] = useState(null)

    const [options, setOptions] = useState({
        url: undefined,
        onMessage: () => {},
        onError: () => {},
        onConnect: () => {},
        onDisconnect: () => {},
    })

    useEffect(() => {
        if (!socket) return
        socket.onmessage = options.onMessage
        socket.onclose = options.onDisconnect
        socket.onopen = options.onConnect
        socket.onerror = options.onError
    }, [socket])

    useEffect(() => {
        if (!options.url) return
        const URL = "ws://" + CELESUP_BASE_URL.split("//")[1] + options.url
        // console.log(URL)
        setSocket(new WebSocket(URL))
    }, [options])

    function initWebSocket(options = {}) {
        setOptions(options)
    }

    return { initWebSocket, socket }
}
