import { celesupApi } from "../../axiosInstances"
import Textarea from "../../features/TextArea"

export default function MessageField({
    activeThread,
    getMessages,
    chatSocket,
}) {
    function sendMessage(value) {
        if (!value.length) return

        const form = new FormData()

        form.append("thread", activeThread.id)
        form.append("recipient", activeThread.recipient.id)
        form.append("body", value.trim())

        celesupApi
            .post("/messages/create", form, {
                headers: { "content-type": "application/json" },
            })
            .then((res) => {
                chatSocket.send(
                    JSON.stringify({ type: "chat", message: value.trim() }),
                )
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className="width-100">
            <Textarea
                placeholder={"Write your message!"}
                onSubmit={sendMessage}
            />
        </div>
    )
}
