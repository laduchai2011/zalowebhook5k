import ServiceRedis from '@src/cache/cacheRedis';
import { mssql_server } from '@src/connect';
import { TokenZaloField } from '@src/dataStruct/tokenZalo';
import { redisKey_storeTokenZalo } from '@src/const/zalo';
import { mssqlGetValue, mssqlUpdateValue, mssqlSetValue } from "@src/cache/cacheMssql";

const serviceRedis = ServiceRedis.getInstance();

const timeExpireat = 60 * 60 * 24 * 30 * 12; // 1 year

async function storeTokenZalo(){
    await serviceRedis.init();
    await mssql_server.init();

   

    // const zaloToken = await serviceRedis.getData<TokenZaloField>(redisKey_storeTokenZalo);
    // console.log('storeTokenZalo', zaloToken);
    // if (!zaloToken) {
    //     console.error('storeTokenZalo', 'Failed to get token in Redis');
    //     const resultget = await mssqlGetValue(redisKey_storeTokenZalo);
    //     if (resultget.isSuccess) {
    //         const resultupdate = await mssqlUpdateValue(redisKey_storeTokenZalo, JSON.stringify(zaloToken));
    //         if (!resultupdate?.isSuccess) {
    //             console.log('Thiết lập zalotoken thất bại !');
    //             return;
    //         }
    //     } else {
    //         const resultset = await mssqlSetValue(redisKey_storeTokenZalo, JSON.stringify(zaloToken));
    //         if (!resultset?.isSuccess) {
    //             console.log('Thiết lập zalotoken thất bại !');
    //             return;
    //         }
    //     }
        
    //     await serviceRedis.setData<TokenZaloField>(redisKey_storeTokenZalo, tokenZalo, timeExpireat);
    // }
    
    const resultget = await mssqlGetValue(redisKey_storeTokenZalo);
    console.log(11111111, resultget)
    
    if (resultget.isSuccess) {
        const tokenZalo = JSON.parse(resultget.data?.value!);
        const resultupdate = await mssqlUpdateValue(redisKey_storeTokenZalo, JSON.stringify(tokenZalo));
        console.log(222222222, resultupdate)
        if (!resultupdate?.isSuccess) {
            console.log('Thiết lập zalotoken thất bại !');
            return;
        }

        await serviceRedis.setData<TokenZaloField>(redisKey_storeTokenZalo, tokenZalo, timeExpireat);
    } else {
        const tokenZalo: TokenZaloField = {
            access_token: process.env.ZALO_ACCESS_TOKEN || '',
            refresh_token: process.env.ZALO_REFRESH_TOKEN || ''
        }
        const resultset = await mssqlSetValue(redisKey_storeTokenZalo, JSON.stringify(tokenZalo));
        console.log(222222222, resultset)
        if (!resultset?.isSuccess) {
            console.log('Thiết lập zalotoken thất bại !');
            return;
        }

        await serviceRedis.setData<TokenZaloField>(redisKey_storeTokenZalo, tokenZalo, timeExpireat);
    }
    
  
}

export {storeTokenZalo}