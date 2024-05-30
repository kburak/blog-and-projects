export default function editCode({ type, index, code, language, update }: { type: string | undefined, index: Number, code: string | undefined, language: string | undefined, update: (...args: any) => void }) {

    function handleCodeUpdate(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        update("code", index, e.target?.value, language);
    }

    function handleLanguageUpdate(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();
        update("code", index, code, e.target?.value);
    }

    return (
        <div>
            <label htmlFor="code">Code</label>
            <input type="text" id="code" name={`${index}-${type}-code`} value={code} onChange={handleCodeUpdate} />

            <label htmlFor="size">Size</label>
            <select id="size" name={`${index}-${type}-language`}  value={language} onChange={handleLanguageUpdate}>
                <option>Javascript</option>
                <option>Json</option>
                <option>Java</option>
            </select>
        </div>
    );
}