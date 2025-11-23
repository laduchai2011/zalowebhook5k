import axios from "axios";
import fs from "fs";
import path from "path";
import ServiceRedis from '@src/cache/cacheRedis';
import { TokenZaloField } from "@src/dataStruct/tokenZalo";
import { redisKey_storeTokenZalo } from "@src/const/zalo";


const serviceRedis = ServiceRedis.getInstance();

const timeExpireat = 60 * 60 * 24 * 30 * 12;

// const tokenPath = path.join(__dirname, "tokenDB.json");

// let config = JSON.parse(fs.readFileSync(tokenPath, "utf8"));

export async function getAccessTokenMessage() {
    await serviceRedis.init();
    const zaloToken = await serviceRedis.getData<TokenZaloField>(redisKey_storeTokenZalo);
    return zaloToken.access_token_message;
}

export async function refreshAccessTokenMessage() {
    console.log("🔄 Refreshing Zalo OA token...");

    await serviceRedis.init();
    const zaloToken = await serviceRedis.getData<TokenZaloField>(redisKey_storeTokenZalo);

    const url = `https://oauth.zaloapp.com/v4/oa/access_token?refresh_token=${zaloToken.refresh_token}`;

    const res = await axios.get(url);

    const newToken = res.data.access_token;
    const newRefresh = res.data.refresh_token;

    zaloToken.access_token_message = newToken;
    zaloToken.refresh_token = newRefresh;

    // Lưu vào file
    // fs.writeFileSync(tokenPath, JSON.stringify(config, null, 2));
    await serviceRedis.setData<TokenZaloField>(redisKey_storeTokenZalo, zaloToken, timeExpireat);

    console.log("✅ Token refreshed OK");

    return newToken;
}
