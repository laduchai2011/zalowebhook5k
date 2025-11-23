import express, { Express } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import process from 'process';

dotenv.config();

import service_zalo_webhook from '@src/services/zalo_webhook'; 

const app: Express = express();
const port = process.env.PORT || 9000;

app.use(cookieParser());
app.use('/api', express.json());
app.use('/api', express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//     const allowedOrigins = ['http://zalo5k.local.com:3000'];
//     const origin = req.headers.origin as string;
//     if (allowedOrigins.includes(origin)) {
//         res.header('Access-Control-Allow-Origin', origin);
//     }
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Allow-Credentials', 'true');

//     // 👉 Quan trọng: xử lý preflight
//     if (req.method === 'OPTIONS') {
//         res.sendStatus(200);
//         return;
//     }

//     next();
// });

app.use('/api/hello', (req, res) => {
    res.send('hello');
});


app.use('/api/service_zalo_webhook', service_zalo_webhook);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
