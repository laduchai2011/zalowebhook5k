export interface ConsumeMessage {
    content: Buffer;
    fields: any;
    properties: any;
}

export interface Channel {
    assertQueue(queue: string): Promise<any>;
    consume(
        queue: string,
        onMessage: (msg: ConsumeMessage | null) => void
    ): any;
    ack(msg: ConsumeMessage): void;
    sendToQueue(queue: string, content: Buffer): boolean;
}

export interface Connection {
    createChannel(): Promise<Channel>;
    on(event: string, handler: (...args: any[]) => void): void;
    close(): void;
}

export interface ConsumeMessage {
    content: Buffer;
    fields: any;
    properties: any;
}

export interface Channel {
    assertQueue(queue: string): Promise<any>;
    consume(queue: string, onMessage: (msg: ConsumeMessage | null) => void): any;
    ack(msg: ConsumeMessage): void;
    sendToQueue(queue: string, content: Buffer): boolean;
}

export interface Connection {
    createChannel(): Promise<Channel>;
    on(event: string, handler: (...args: any[]) => void): void;
    close(): void;
}
