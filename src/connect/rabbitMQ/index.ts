// import * as amqp from "amqplib";
// import { Connection, Channel } from 'amqplib';

// export class RabbitMQ {
//     private static instance: RabbitMQ;
//     private connection!: Connection;
//     private channel!: Channel;

//     private constructor() {}

//     public static async getInstance(): Promise<RabbitMQ> {
//         if (!RabbitMQ.instance) {
//             RabbitMQ.instance = new RabbitMQ();
//             await RabbitMQ.instance.init();
//         }
//         return RabbitMQ.instance;
//     }

//     private async init() {
//         this.connection = await amqp.connect(process.env.RABBIT_URL || 'amqp://5kaquarium.com');
//         this.channel = await this.connection.createChannel();

//         this.connection.on('error', (err) => {
//             console.error('RabbitMQ connection error:', err);
//         });

//         this.connection.on('close', () => {
//             console.warn('RabbitMQ connection closed');
//         });

//         console.log('RabbitMQ connected');
//     }

//     public getChannel(): Channel {
//         return this.channel;
//     }
// }


import { connect } from "amqplib";
import type { Connection, Channel } from "@src/types/amqp";

export class RabbitMQ {
    private static instance: RabbitMQ;

    private connection!: Connection;
    private channel!: Channel;

    private constructor() {}

    public static async getInstance(): Promise<RabbitMQ> {
        if (!RabbitMQ.instance) {
            RabbitMQ.instance = new RabbitMQ();
            await RabbitMQ.instance.init();
        }
        return RabbitMQ.instance;
    }

    private async init() {
        const url = process.env.RABBIT_URL || "amqp://guest:guest@5kaquarium.com:5672";

        // connect() TRẢ VỀ Connection — đúng type
        const conn: Connection = await connect(url);
        this.connection = conn;

        // createChannel() TRẢ VỀ Channel — đúng type
        const ch: Channel = await conn.createChannel();
        this.channel = ch;

        console.log("RabbitMQ connected");

        this.connection.on("error", (err) => {
            console.error("RabbitMQ connection error:", err);
        });

        this.connection.on("close", () => {
            console.warn("RabbitMQ connection closed");
        });
    }

    public getChannel(): Channel {
        return this.channel;
    }
}

