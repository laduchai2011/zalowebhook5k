export interface MessageField {
    id: number;
    eventName: string;
    sender: sender_type;
    receiveId: string;
    message: string;
    timestamp: string;
    messageStatus: messageStatus_type;
    status: string;
    accountId: number;
    updateTime: string;
    createTime: string;
}

export interface MessageBodyField {
    page: number;
    size: number;
    accountId?: number;
}

export interface PagedMessageField {
    items: MessageField[];
    totalCount: number;
}

export interface CreateMessageBodyField {
    eventName: string;
    sender: sender_type;
    message: string;
    timestamp: string;
    messageStatus: string;
    accountId: number;
}

export enum messageStatus_enum {
    SENDING = 'SENDING',
    SENT = 'SENT',
    RECEIVE = 'RECEIVE',
    SEEN = 'SEEN',
}

type messageStatus_type =
    | messageStatus_enum.SENDING
    | messageStatus_enum.SENT
    | messageStatus_enum.RECEIVE
    | messageStatus_enum.SEEN;

export enum sender_enum {
    MEMBER = 'MEMBER',
    CUSTOMER = 'CUSTOMER',
}

type sender_type = sender_enum.MEMBER | sender_enum.CUSTOMER;
