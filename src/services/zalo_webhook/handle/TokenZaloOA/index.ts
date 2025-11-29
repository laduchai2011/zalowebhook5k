import axios from 'axios';
import qs from 'qs';
import { serviceRedlock } from '@src/connect';
import ServiceRedis from '@src/cache/cacheRedis';
import { TokenZaloField, TokenResField } from '@src/dataStruct/tokenZalo';
import { redisKey_storeTokenZalo, redisKey_storeTokenZalo_lock } from '@src/const/zalo';

const serviceRedis = ServiceRedis.getInstance();

const timeExpireat = 60 * 60 * 24 * 30 * 12;

export async function getAccessToken() {
    await serviceRedis.init();
    const zaloToken = await serviceRedis.getData<TokenZaloField>(redisKey_storeTokenZalo);
    return zaloToken.access_token;
}

export async function refreshAccessToken() {
    // // console.log('🔄 Refreshing Zalo OA token...');

    // await serviceRedis.init();
    // const zaloToken = await serviceRedis.getData<TokenZaloField>(redisKey_storeTokenZalo);

    // const url = `https://oauth.zaloapp.com/v4/oa/access_token?refresh_token=${zaloToken.refresh_token}`;

    // const res = await axios.get<TokenResField>(url);

    // const newToken = res.data.access_token;
    // const newRefresh = res.data.refresh_token;

    // zaloToken.access_token_message = newToken;
    // zaloToken.refresh_token = newRefresh;

    // await serviceRedis.setData<TokenZaloField>(redisKey_storeTokenZalo, zaloToken, timeExpireat);

    // // console.log('✅ Token refreshed OK');

    // return newToken;
    // console.log('🔄 Refreshing Zalo OA token...');

    await serviceRedis.init();

    const lock = await serviceRedlock.acquire([redisKey_storeTokenZalo_lock], 30000);

    const zaloToken = await serviceRedis.getData<TokenZaloField>(redisKey_storeTokenZalo);

    // const url = `https://oauth.zaloapp.com/v4/oa/access_token?refresh_token=${zaloToken.refresh_token}`;

    // const res = await axios.get<TokenResField>(url);

    const body = qs.stringify({
        app_id: '2474292114893114248',
        grant_type: 'refresh_token',
        refresh_token: zaloToken.refresh_token,
        // code: "6aB5KTVRPdSmP_jYz_X3I1rCqbUnnr1RQdsiU_Vj7t0BGwnWq_yqTcD8jMAOn1vmEKMKPEEzHtX1EyjDk9LnN6iWwKgxW65f4Id_TgUYTsXUA8vH-ge2CXSXd5gPrbuJ1HZv1U6LImOkHPvEbeecUKrkkKImtmfQSNAnOBVf0cC5OgHXlPflFGP7yq_nl2Kt4nQL9Toe2204JCXNrBmMK6nfn1VUyKXbA2gOGCNsSnTB5hqTYeq7461ojMxzc6yaIrBDa-pYSxzJtJESXMYlZqt-5EoMGxBd6_i9p-n0WjGv93xkQfZKwuKLV-LrNoR6l-Aqp7ORMCFaXy7n9MadsxtSxTOJU1QYeu2zn4rl2hjUMIRrFjuzY_nwNG",
    });

    try {
        const res = await axios.post<TokenResField>('https://oauth.zaloapp.com/v4/oa/access_token', body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Secret_key: '7XFkowzBCeRBRGqDhUkL',
            },
        });

        // console.log('NEW ACCESS TOKEN:', res.data);

        const newToken = res.data.access_token;
        const newRefresh = res.data.refresh_token;

        zaloToken.access_token = newToken;
        zaloToken.refresh_token = newRefresh;

        await serviceRedis.setData<TokenZaloField>(redisKey_storeTokenZalo, zaloToken, timeExpireat);

        // console.log('✅ Token refreshed OK');

        await lock.release();
        return newToken;
        // return res.data;
    } catch (err: any) {
        console.error('REFRESH ERROR:', err.response?.data || err);
        await lock.release();
    }
}

// export async function getAccessTokenInfor() {
//     await serviceRedis.init();
//     const zaloToken = await serviceRedis.getData<TokenZaloField>(redisKey_storeTokenZalo);
//     return zaloToken.access_token;
// }

// export async function refreshAccessTokenInfor() {
//     // console.log('🔄 Refreshing Zalo OA token...');

//     await serviceRedis.init();
//     const zaloToken = await serviceRedis.getData<TokenZaloField>(redisKey_storeTokenZalo);

//     // const url = `https://oauth.zaloapp.com/v4/oa/access_token?refresh_token=${zaloToken.refresh_token}`;

//     // const res = await axios.get<TokenResField>(url);

//     const body = qs.stringify({
//         app_id: '2474292114893114248',
//         grant_type: 'refresh_token',
//         refresh_token: zaloToken.refresh_token,
//         // code: "6aB5KTVRPdSmP_jYz_X3I1rCqbUnnr1RQdsiU_Vj7t0BGwnWq_yqTcD8jMAOn1vmEKMKPEEzHtX1EyjDk9LnN6iWwKgxW65f4Id_TgUYTsXUA8vH-ge2CXSXd5gPrbuJ1HZv1U6LImOkHPvEbeecUKrkkKImtmfQSNAnOBVf0cC5OgHXlPflFGP7yq_nl2Kt4nQL9Toe2204JCXNrBmMK6nfn1VUyKXbA2gOGCNsSnTB5hqTYeq7461ojMxzc6yaIrBDa-pYSxzJtJESXMYlZqt-5EoMGxBd6_i9p-n0WjGv93xkQfZKwuKLV-LrNoR6l-Aqp7ORMCFaXy7n9MadsxtSxTOJU1QYeu2zn4rl2hjUMIRrFjuzY_nwNG",
//     });

//     try {
//         const res = await axios.post<TokenResField>('https://oauth.zaloapp.com/v4/oa/access_token', body, {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 Secret_key: '7XFkowzBCeRBRGqDhUkL',
//             },
//         });

//         // console.log('NEW ACCESS TOKEN:', res.data);

//         const newToken = res.data.access_token;
//         const newRefresh = res.data.refresh_token;

//         zaloToken.access_token = newToken;
//         zaloToken.refresh_token = newRefresh;

//         await serviceRedis.setData<TokenZaloField>(redisKey_storeTokenZalo, zaloToken, timeExpireat);

//         // console.log('✅ Token refreshed OK');

//         return newToken;
//         // return res.data;
//     } catch (err: any) {
//         console.error('REFRESH ERROR:', err.response?.data || err);
//     }
// }
