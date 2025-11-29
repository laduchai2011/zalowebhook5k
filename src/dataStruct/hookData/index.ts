export enum zalo_event_name_enum {
    user_send_text = 'user_send_text',
    user_send_image = 'user_send_image',
    oa_send_text = 'oa_send_text',
    user_received_message = 'user_received_message',
    user_seen_message = 'user_seen_message',
    member_sending = 'member_sending',
}

type zalo_event_name_type =
    | zalo_event_name_enum.user_send_text
    | zalo_event_name_enum.user_send_image
    | zalo_event_name_enum.oa_send_text
    | zalo_event_name_enum.user_received_message
    | zalo_event_name_enum.user_seen_message
    | zalo_event_name_enum.member_sending;

export interface HookDataField<Tdata = ZaloMessage> {
    app_id: string;
    user_id_by_app: string;
    event_name: zalo_event_name_type;
    sender: {
        id: string;
    };
    recipient: {
        id: string;
    };
    message: Tdata;
    timestamp: string;
}

export interface MessageTextField {
    text: string;
    msg_id: string;
}

type ZaloMessage = MessageTextField | Record<string, unknown>; // fallback

export interface ZaloCustomerField {
    data: {
        avatar: string;
        avatars: {
            120: string;
            240: string;
        };
        display_name: string;
        dynamic_param: string;
        is_sensitive: boolean;
        shared_info: {
            address: string;
            city: string;
            district: string;
            name: string;
            phone: number;
            user_dob: string;
        };
        tags_and_notes_info: {
            notes: string[];
            tag_names: string[];
        };
        user_alias: string;
        user_external_id: string;
        user_id: string;
        user_id_by_app: string;
        user_is_follower: boolean;
        user_last_interaction_date: string;
        user_gender: string;
        tags: [];
    };
    error: number;
    message: string;
}
