import axios from "axios";
import { getAccessToken, refreshAccessToken } from "../TokenZaloOA";
import { HookDataField, HookDataFieldToSend, ZaloMessage, MessageTextField } from "@src/dataStruct/hookData";


async function sendTextMessageToUser(userId: string, text: string) {
    const payload = {
        recipient: {
            user_id: userId
        },
        message: {
            text: text
        }
    };

    try {
        const token = await getAccessToken();

        // console.log('token', token)

        const result = await axios.post(
            "https://openapi.zalo.me/v3.0/oa/message/cs",
            // 'https://business.openapi.zalo.me/message/template',
            payload,
            {
                headers: {
                    access_token: token,
                    "Content-Type": "application/json"
                }
            }
        );
        // console.log('result', result.data.error)
        if (result.data.error !==0 ) {
            const newToken = await refreshAccessToken();

            const result1 = await axios.post(
                "https://openapi.zalo.me/v3.0/oa/message/cs",
                payload,
                {
                    headers: {
                        access_token: newToken,
                        "Content-Type": "application/json"
                    }
                }
            );
           
            // console.log('result1', result.data.error)
            return result1;
        }
        return result;
    } catch (err: any) {
        // Nếu lỗi hết hạn token
        console.error(err);

        if (err.response?.data?.message === "Access token has expired") {
            const newToken = await refreshAccessToken();

            return await axios.post(
                "https://openapi.zalo.me/v3.0/oa/message/cs",
                payload,
                {
                    headers: {
                        access_token: newToken,
                        "Content-Type": "application/json"
                    }
                }
            );
        }
    }
}

async function sendMessageToUser(payload: HookDataFieldToSend<ZaloMessage> | HookDataField<MessageTextField>) {
    try {
        const token = await getAccessToken();

        // console.log('token', token)

        const result = await axios.post(
            "https://openapi.zalo.me/v3.0/oa/message/cs",
            // 'https://business.openapi.zalo.me/message/template',
            payload,
            {
                headers: {
                    access_token: token,
                    "Content-Type": "application/json"
                }
            }
        );
        console.log('result', result.data)
        if (result.data.error !==0 ) {
            const newToken = await refreshAccessToken();

            const result1 = await axios.post(
                "https://openapi.zalo.me/v3.0/oa/message/cs",
                payload,
                {
                    headers: {
                        access_token: newToken,
                        "Content-Type": "application/json"
                    }
                }
            );
           
            console.log('result1', result.data)
            return result1;
        }
        return result;
    } catch (err: any) {
        // Nếu lỗi hết hạn token
        console.error(err);

        if (err.response?.data?.message === "Access token has expired") {
            const newToken = await refreshAccessToken();

            return await axios.post(
                "https://openapi.zalo.me/v3.0/oa/message/cs",
                payload,
                {
                    headers: {
                        access_token: newToken,
                        "Content-Type": "application/json"
                    }
                }
            );
        }
    }
}

export { sendTextMessageToUser, sendMessageToUser };