export default function editText({ type, index, content, formatting, update }: { type: string | undefined, index: Number, content: string | undefined, formatting: string | undefined, update: (...args: any) => void }) {

    function handleContentUpdate(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        update("text", index, e.target?.value, formatting);
    }

    function handleFormattingUpdate(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();
        update("text", index, content, e.target?.value);
    }

    return (
        <div>
            <label htmlFor="content">Content</label>
            <input type="text" id="content" value={content} onChange={handleContentUpdate} />

            <label htmlFor="formatting">Formatting</label>
            <select id="formatting" onChange={handleFormattingUpdate}>
                <option>h1</option>
                <option>h2</option>
                <option>h3</option>
            </select>
        </div>
    );
}