import sql from './db';

export function deleteText(textId: string) {
    return sql`DELETE FROM text WHERE id = ${textId}`;
}

export function insertText(postid: string, size: string, style: string, word_count: number, content: string, position: number) {
    return sql`
    INSERT INTO text (postid, size, style, word_count, content, position)
    VALUES (${postid}, ${size}, ${style}, ${word_count}, ${content}, ${position})
    `;
}

export function updateText() {

}