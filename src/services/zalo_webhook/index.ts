import express, { Router } from 'express';
import dotenv from 'dotenv';
import Handle_Zalo_WebHook from './handle';
import { storeTokenZalo } from './storeTokenZalo';
import { ListenerMessage } from './handle/ListenerMessage';

dotenv.config();

storeTokenZalo();

ListenerMessage();

const service_zalo_webhook: Router = express.Router();

const handle_zalo_webHook = new Handle_Zalo_WebHook();

service_zalo_webhook.get("/zalo/webhook", handle_zalo_webHook.getData);

service_zalo_webhook.post("/zalo/webhook", handle_zalo_webHook.postData);

export default service_zalo_webhook;