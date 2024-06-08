export default function editText({
    type,
    index,
    dbUpdate,
    dbDelete,
    content,
    size,
    style,
    update,
    remove
}: {
    type: string | undefined,
    index: number,
    dbUpdate: boolean | undefined,
    dbDelete: boolean | undefined,
    content: string | undefined,
    size: string | undefined,
    style: string | undefined,
    update: (...args: any) => void,
    remove: (...args: any) => void
}) {

    function handleRemove(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        remove("text", index);
    }

    function handleContentUpdate(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault();
        update("text", index, e.target?.value, size, style);
    }

    function handleSizeUpdate(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();
        update("text", index, content, e.target?.value, style);
    }

    function handleStyleUpdate(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();
        update("text", index, content, size, e.target?.value);
    }

    return (
        <div className="p-4 relative">{/* // If to be deleted hide content. */}
            <p>{type?.toUpperCase()}</p>
            <input type="checkbox" name={`${index}-${type}-dbUpdate`} checked={dbUpdate} readOnly /> {/* Not submitted when false. When checked, submitted to server as 'on' if no value provided. */}
            <input type="checkbox" name={`${index}-${type}-dbDelete`} checked={dbDelete} readOnly /> {/* Not submitted when false. When checked, submitted to server as 'on' if no value provided. */}
            <label htmlFor="content">Content</label>
            <textarea id="content" className="bg-gray-100" name={`${index}-${type}-content`} value={content} onChange={handleContentUpdate} />

            <label htmlFor="formatting">Size</label>
            <select id="formatting" className="bg-gray-100" name={`${index}-${type}-size`} value={size} onChange={handleSizeUpdate}>
                <option>h1</option>
                <option>h2</option>
                <option>h3</option>
                <option>h4</option>
                <option>h5</option>
                <option>p</option>
            </select>
            <label htmlFor="formatting">Style</label>
            <select id="formatting" className="bg-gray-100" name={`${index}-${type}-style`} value={style} onChange={handleStyleUpdate}>
                <option>normal</option>
                <option>italic</option>
                <option>bold</option>
            </select>
            <button type="button" className="h-5 rounded-lg bg-red-500 px-4 text-sm font-medium text-white transition-colors hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 active:bg-red-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50" name={`${index}-${type}-dbDelete`} onClick={handleRemove}>Delete</button>
        </div>
    );
}