import { Request, Response } from 'express';
import process from 'process';
import { sendMessage } from '@src/messageQueue/Producer';
import { MessageZaloField } from '@src/messageQueue/type';
import { HookDataField, MessageTextField, MessageImagesField, MessageVideosField } from '@src/dataStruct/hookData';
// import { sendTextMessageToUser } from './MessageToUser';
import { zalo_event_name_enum, zalo_event_name_enum_messageQueue } from '@src/dataStruct/hookData';

const VERIFY_TOKEN = process.env.ZALO_VERIFY_TOKEN!;



class Handle_Zalo_WebHook {

    getData = async (req: Request, res: Response) => {
        
        // console.log(1111111, req.query)
        const { verify_token } = req.query;

        if (verify_token === VERIFY_TOKEN) {
            res.status(200).send(verify_token);
            return;
        }

        res.status(403).send("Invalid verify token");
        return;
    };

    postData = (req: Request<unknown, unknown, HookDataField<unknown>>, res: Response) => {
        console.log("Zalo Webhook Event:", req.body);
        const hookDataBody = req.body;


        // Xử lý khi user gửi tin nhắn
        if (hookDataBody.event_name === zalo_event_name_enum.user_send_text) {
            const hookData = {...hookDataBody} as HookDataField<MessageTextField>;
            const messageZalo: MessageZaloField = {
                data: hookData,
                isNewCustom: true,
                accountId: -1
            }
            sendMessage(zalo_event_name_enum_messageQueue.user_send_text, messageZalo)
            res.status(200).send("OK");
            return;
        }

        if (hookDataBody.event_name === zalo_event_name_enum.user_send_image) {
            const hookData = {...hookDataBody} as HookDataField<MessageImagesField>;
            const messageZalo: MessageZaloField = {
                data: hookData,
                isNewCustom: true,
                accountId: -1
            }
            sendMessage(zalo_event_name_enum_messageQueue.user_send_image, messageZalo)
            res.status(200).send("OK");
            return;
        }

        if (hookDataBody.event_name === zalo_event_name_enum.user_send_video) {
            const hookData = {...hookDataBody} as HookDataField<MessageVideosField>;
            const messageZalo: MessageZaloField = {
                data: hookData,
                isNewCustom: true,
                accountId: -1
            }
            sendMessage(zalo_event_name_enum_messageQueue.user_send_video, messageZalo)
            res.status(200).send("OK");
            return;
        }

        if (hookDataBody.event_name === zalo_event_name_enum.oa_send_text) {
            const hookData = {...hookDataBody} as HookDataField<MessageTextField>;
            const messageZalo: MessageZaloField = {
                data: hookData,
                isNewCustom: true,
                accountId: -1
            }
            sendMessage(zalo_event_name_enum_messageQueue.oa_send_text, messageZalo)
            res.status(200).send("OK");
            return;
        }

        if (hookDataBody.event_name === zalo_event_name_enum.oa_send_image) {
            const hookData = {...hookDataBody} as HookDataField<MessageImagesField>;
            const messageZalo: MessageZaloField = {
                data: hookData,
                isNewCustom: true,
                accountId: -1
            }
            sendMessage(zalo_event_name_enum_messageQueue.oa_send_image, messageZalo)
            res.status(200).send("OK");
            return;
        }

        res.status(200).json({ received: true });
        return;
    };
}

export default Handle_Zalo_WebHook;
