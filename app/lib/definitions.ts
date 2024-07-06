export type ContentType = {
    type: string;
    id?: string;
    url?: string;
    caption?: string;
    content?: string;
    style?: string;
    code?: string;
    language?: string;
    size?: string;
    dbUpdate?: boolean,
    dbDelete?: boolean,
    dbInsert?: boolean
};