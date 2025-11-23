import axios from "axios";
import { getAccessTokenMessage, refreshAccessTokenMessage } from "../TokenZaloOA";


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
        const token = await getAccessTokenMessage();

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
        // console.log('result', result)
        return result;
    } catch (err: any) {
        // Nếu lỗi hết hạn token
        console.error(err);

        if (err.response?.data?.message === "Access token has expired") {
            const newToken = await refreshAccessTokenMessage();

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

export { sendTextMessageToUser };