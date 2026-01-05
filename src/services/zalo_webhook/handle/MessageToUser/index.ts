import axios from "axios";
import { getAccessToken, refreshAccessToken } from "../TokenZaloOA";
import { HookDataField, HookDataFieldToSend, ZaloMessage, MessageTextField } from "@src/dataStruct/hookData";


// async function sendTextMessageToUser(userId: string, text: string) {
//     const payload = {
//         recipient: {
//             user_id: userId
//         },
//         message: {
//             text: text
//         }
//     };

//     try {
//         const token = await getAccessToken();
//         if (!token) {
//             console.error('sendTextMessageToUser', 'Failed to get token in Redis');
//             return null;
//         }

//         const result = await axios.post(
//             "https://openapi.zalo.me/v3.0/oa/message/cs",
//             payload,
//             {
//                 headers: {
//                     access_token: token,
//                     "Content-Type": "application/json"
//                 }
//             }
//         );
//         if (result.data.error !==0 ) {
//             const newToken = await refreshAccessToken();
//             if (!newToken) {
//                 console.error('Could not refresh Zalo access token');
//                 return;
//             }

//             const result1 = await axios.post(
//                 "https://openapi.zalo.me/v3.0/oa/message/cs",
//                 payload,
//                 {
//                     headers: {
//                         access_token: newToken,
//                         "Content-Type": "application/json"
//                     }
//                 }
//             );
           
//             return result1;
//         }
//         return result;
//     } catch (err: any) {
//         // Nếu lỗi hết hạn token
//         console.error(err);

//         if (err.response?.data?.message === "Access token has expired") {
//             const newToken = await refreshAccessToken();
//             if (!newToken) {
//                 console.error('Could not refresh Zalo access token');
//                 return;
//             }

//             return await axios.post(
//                 "https://openapi.zalo.me/v3.0/oa/message/cs",
//                 payload,
//                 {
//                     headers: {
//                         access_token: newToken,
//                         "Content-Type": "application/json"
//                     }
//                 }
//             );
//         }
//     }
// }

async function sendMessageToUser(payload: HookDataFieldToSend<ZaloMessage> | HookDataField<MessageTextField>) {
    try {
        const token = await getAccessToken();
        if (!token) {
            console.error('sendMessageToUser', 'Failed to get token in Redis');
            return null;
        }

        // console.log('token', token)

        const result = await axios.post(
            "https://openapi.zalo.me/v3.0/oa/message/cs",
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
            if (!newToken) {
                console.error('sendMessageToUser', 'Could not refresh Zalo access token');
                return;
            }

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
            if (!newToken) {
                console.error('sendMessageToUser', 'Failed to refresh token in Redis');
                return null;
            }

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

export { sendMessageToUser };