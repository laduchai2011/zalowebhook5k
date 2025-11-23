import type { ConsumeMessage } from '@src/types/amqp';
import { RabbitMQ } from '@src/connect/rabbitMQ';
import { MessageZaloField } from '../type';

export async function consumeMessage(queue: string, callback: (messageZalo: MessageZaloField) => void) {
    const rabbit = await RabbitMQ.getInstance();
    const channel = rabbit.getChannel();

    await channel.assertQueue(queue);

    channel.consume(queue, (msg: ConsumeMessage | null) => {
        if (!msg) return;

        const data = JSON.parse(msg.content.toString());
        // console.log('Received:', data);
        callback(data);

        channel.ack(msg);
    });
}
