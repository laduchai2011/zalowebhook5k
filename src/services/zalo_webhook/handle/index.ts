import { Request, Response } from 'express';
import process from 'process';
import { sendMessage } from '@src/messageQueue/Producer';
import { MessageZaloField } from '@src/messageQueue/type';
import { HookDataField, MessageTextField } from '@src/dataStruct/hookData';
import { sendTextMessageToUser } from './MessageToUser';


const VERIFY_TOKEN = process.env.ZALO_VERIFY_TOKEN!;

class Handle_Zalo_WebHook {

    getData = async (req: Request, res: Response) => {
        
        console.log(1111111, req.query)
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
        if (hookDataBody.event_name === "user_send_text") {
            const hookData = {...hookDataBody} as HookDataField<MessageTextField>;
            const senderId = hookData.sender.id;
            const text = hookData.message.text;

            console.log(`User(${senderId}) sent: ${text}`);

            const messageZalo: MessageZaloField = {
                data: hookData,
                isNewCustom: true,
                accountId: -1
            }

            sendTextMessageToUser(hookData.sender.id, `5k aquarium xin chao ${hookData.message.text}`)

            sendMessage('customerSend_checkMyCustommer', messageZalo)

            // TODO: Gửi tin nhắn tự động hoặc phân phối nhân viên
            // const reply = {
            //     recipient: { user_id: hookData.sender.id },
            //     message: { text: `Cảm ơn bạn đã nhắn: "${hookData.message.text}". Đây là phản hồi tự động trong 48h.` }
            // };

            res.status(200).send("OK");
            return;
        }

        res.status(200).json({ received: true });
        return;
    };
}

export default Handle_Zalo_WebHook;
