import sql from './db';

export function deleteImage(imageId: string) {
    return sql`DELETE FROM image WHERE id = ${imageId}`;
}

export function insertImage() {

}

export function updateImage() {

}