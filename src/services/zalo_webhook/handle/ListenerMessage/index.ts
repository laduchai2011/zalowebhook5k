import { consumeMessage } from "@src/messageQueue/Consumer";
import { sendTextMessageToUser } from "../MessageToUser";
import { MessageField } from "@src/dataStruct/message";
import { HookDataField, MessageTextField } from "@src/dataStruct/hookData";

function ListenerMessage () {
    consumeMessage('memberSend_sendToCustomer', (data) => {
        const resData = JSON.parse(data.data) as MessageField;
        const message = resData.message;
        const hookData: HookDataField<MessageTextField> = JSON.parse(message)
        const messageText: MessageTextField = hookData.message;
        console.log('ListenerMessage', hookData)
        sendTextMessageToUser(hookData.recipient.id, messageText.text)
    })
}

export {ListenerMessage}