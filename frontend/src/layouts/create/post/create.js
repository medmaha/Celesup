import { Provider } from "react-redux"
import { createContext, useState } from "react"
import { AppStore } from "../../../redux/store"

import Modal from "../../../features/Modal"

// ? Post Components
import CreatePost from "./CreatePost"

export default function Create() {
    const [config, setConfig] = useState({})
    return (
        <Provider store={AppStore}>
            <Modal
                options={{
                    maxHeight: true,
                    setHeader: <>{config.header || ""}</>,
                }}
                children={<CreatePost setConfig={setConfig} />}
            />
        </Provider>
    )
}
