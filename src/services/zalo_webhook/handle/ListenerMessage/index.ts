import { consumeMessage } from "@src/messageQueue/Consumer";
// import { sendMessageTD } from "@src/messageQueue/Producer";
import { sendMessageToUser } from "../MessageToUser";
import { MessageField, messageType_enum } from "@src/dataStruct/message";
import { HookDataField, MessageTextField, ZaloMessage, MessageImagesField, MessageVideoField, HookDataFieldToSend } from "@src/dataStruct/hookData";
import { memberSend_sendToCustomer } from '@src/const/keyRabbitMQ';

const OAID = '2018793888801741529';

async function ListenerMessage () {
    consumeMessage(memberSend_sendToCustomer, (data) => {
        const resData = JSON.parse(data.data) as MessageField;
        const message = resData.message;
        const hookData: HookDataField<ZaloMessage> = JSON.parse(message)
        // const messageText: MessageTextField = hookData.message;
        // sendTextMessageToUser(hookData.recipient.id, messageText.text)
        const mesType = resData.type
        // console.log('ListenerMessage', hookData, mesType)
        switch(mesType) { 
            case messageType_enum.TEXT: { 
                const hookDataFieldToSend = {recipient: {user_id: hookData.recipient.id}, message: hookData.message} as HookDataFieldToSend<MessageTextField>
                sendMessageToUser(hookDataFieldToSend);
                break; 
            } 
            case messageType_enum.IMAGES: { 
                const hookDataFieldToSend = {recipient: {user_id: hookData.recipient.id}, message: hookData.message} as HookDataFieldToSend<MessageImagesField>
                // console.log('ListenerMessage', messageType_enum.IMAGES, hookData.recipient.id, hookDataFieldToSend.message.attachment.payload)
                sendMessageToUser(hookDataFieldToSend);
                break; 
            } 
            // case messageType_enum.VIDEOS: { 
            //     // const hookDataFieldToSend = {recipient: {user_id: hookData.recipient.id}, message: hookData.message} as HookDataFieldToSend<MessageImagesField>
            //     // console.log('ListenerMessage', messageType_enum.IMAGES, hookData.recipient.id, hookDataFieldToSend.message.attachment.payload)
            //     // sendMessageToUser(hookDataFieldToSend);
            //     const hookData1 = hookData as HookDataField<MessageVideoField>
            //     const fileName2 = new URL(hookData1.message.attachment.payload.elements[0].url).searchParams.get('id');
            //     sendMessageTD('send_videoTD', {
            //         receiveId: hookData.recipient.id,
            //         oaid: OAID,
            //         name: fileName2,
            //         accountId: hookData.sender.id
            //     })
            //     break; 
            // } 
            default: { 
                //statements; 
                break; 
            } 
        } 
    })
}

export { ListenerMessage }