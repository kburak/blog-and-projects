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
    dbInsert?: boolean,
    iframetype?: string,
    title?: string,
};

export type Post = "Project" | "Blog";

export interface ContentObject {
    [key: string]: string | File
}

/* export interface TagObject {
    name: string | File
}
 */