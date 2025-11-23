export interface MyCustomerField {
    id: number;
    senderId: string;
    status: string;
    accountId: number;
    updateTime: string;
    createTime: string;
}

export interface CreateMyCustomerBodyField {
   senderId: string;
   accountId: number;
}

export interface IsMyCustomerBodyField {
   senderId: string;
   accountId: number;
}

export interface MyCustomerBodyField {
    page: number;
    size: number;
    accountId?: number;
}


export interface PagedMyCustomField {
    items: MyCustomerField[];
    totalCount: number;
}