import FlexTextArea from "./flexTextArea";

export default function editCode({
    type,
    index,
    dbUpdate,
    dbDelete,
    dbInsert,
    code,
    language,
    update,
    remove,
    errors,
}: {
    type: string | undefined,
    index: number,
    dbUpdate: boolean | undefined,
    dbDelete: boolean | undefined,
    dbInsert: boolean | undefined,
    code: string | undefined,
    language: string | undefined,
    update: (...args: any) => void,
    remove: (...args: any) => void,
    errors: { [key: string]: string }
}) {

    function handleRemove(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        remove("code", index, false, dbInsert);
    }

    function handleRemoveRevert(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        remove("code", index, true);
    }

    function handleCodeUpdate(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        update("code", index, e.target?.value, language);
    }

    function handleLanguageUpdate(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();
        update("code", index, code, e.target?.value);
    }

    return (
        <div className="p-4 relative">{/* // If to be deleted hide content. */}
            <p>{type?.toUpperCase()}</p>
            <input type="checkbox" name={`${index}-${type}-dbUpdate`} checked={dbUpdate} readOnly /> {/* Not submitted when false. When checked, submitted to server as 'on' if no value provided. */}
            <input type="checkbox" name={`${index}-${type}-dbDelete`} checked={dbDelete} readOnly /> {/* Not submitted when false. When checked, submitted to server as 'on' if no value provided. */}
            <input type="checkbox" name={`${index}-${type}-dbInsert`} checked={dbInsert} readOnly /> {/* Not submitted when false. When checked, submitted to server as 'on' if no value provided. */}
            <FlexTextArea
                id="code"
                name={`${index}-${type}-code`}
                value={code ?? ""}
                changeHandler={handleCodeUpdate}
                showLabel={true}
                visualName="Code"
                minLength={1}
                maxLength={99999}
                allowEnter={true}
                textSize="p"
                textStyle="normal"
                error={errors?.code}
            />
            <label htmlFor="size">Size</label>
            <select id="size" className="bg-gray-100" name={`${index}-${type}-language`} value={language} onChange={handleLanguageUpdate}>
                <option>javascript</option>
                <option>json</option>
                <option>java</option>
            </select>
            <div className="absolute right-0 top-0 p-4">
                <button
                    type="button"
                    className="h-5 rounded-lg bg-red-500 px-4 text-sm font-medium text-white transition-colors hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 active:bg-red-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                    name={`${index}-${type}-dbDelete`}
                    onClick={handleRemove}
                >
                    Delete
                </button>
            </div>
            {dbDelete &&
                <div className="flex flex-col items-center justify-center absolute bg-black bg-opacity-50 absolute inset-0">
                    <p className="text-white">Mark to be deleted.</p>
                    <button
                        className="text-white h-5 rounded-lg bg-red-500 px-5 pb-7"
                        type="button"
                        onClick={handleRemoveRevert}
                    >
                        Revert
                    </button>
                </div>
            }
        </div>
    );
}