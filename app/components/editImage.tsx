export default function editImage({ type, index, url, caption, size, update }: { type: string | undefined, index: Number, url: string | undefined, caption: string | undefined, size: string | undefined, update: (...args: any) => void }) {

    function handleUrlUpdate(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        update("image", index, e.target?.value, caption, size);
    }

    function handleCaptionUpdate(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        update("image", index, url, e.target?.value, size);
    }

    function handleSizeUpdate(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();
        update("image", index, url, caption, e.target?.value);
    }

    return (
        <div>
            <label htmlFor="url">Url</label>
            <input type="text" id="url" value={url} onChange={handleUrlUpdate} />

            <label htmlFor="caption">Caption</label>
            <input type="text" id="caption" onChange={handleCaptionUpdate} />

            <label htmlFor="size">Size</label>
            <select id="size" onChange={handleSizeUpdate}>
                <option>small</option>
                <option>medium</option>
                <option>large</option>
            </select>
        </div>
    );
}