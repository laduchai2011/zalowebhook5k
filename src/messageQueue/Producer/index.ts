import { RabbitMQ } from "@src/connect/rabbitMQ";
import { MessageZaloField } from '../type';

export async function sendMessage(queue: string, messageZalo: MessageZaloField) {
    const rabbit = await RabbitMQ.getInstance();
    const channel = rabbit.getChannel();

    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(messageZalo)));
}
