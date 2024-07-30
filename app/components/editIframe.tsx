import FlexTextArea from "./flexTextArea";

export default function editIFrame({
    type,
    id,
    index,
    dbUpdate,
    dbDelete,
    dbInsert,
    iframetype,
    url,
    title,
    update,
    remove,
    errors
}: {
    type: string | undefined,
    id?: string,
    index: number,
    dbUpdate: boolean | undefined,
    dbDelete: boolean | undefined,
    dbInsert: boolean | undefined,
    iframetype: string | undefined,
    url: string | undefined,
    title: string | undefined,
    update: (...args: any) => void,
    remove: (...args: any) => void,
    errors: { [key: string]: string }
}) {

    function handleRemove(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        remove(type, index, false, dbInsert);
    }

    function handleRemoveRevert(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        remove(type, index, true);
    }

    function handleIframeTypeUpdate(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();
        update(type, index, e.target?.value, url, title);
    }

    function handleUrlUpdate(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        update(type, index, iframetype, e.target?.value, title);
    }

    function handleTitleUpdate(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        update(type, index, iframetype, url, e.target?.value);
    }

    return (
        <div className="p-4 relative">{/* // If to be deleted hide content. */}
            <p>{type?.toUpperCase()}</p>
            <input type="checkbox" name={`${index}-${type}-dbUpdate`} checked={dbUpdate} readOnly /> {/* Not submitted when false. When checked, submitted to server as 'on' if no value provided. */}
            <input type="checkbox" name={`${index}-${type}-dbDelete`} checked={dbDelete} readOnly /> {/* Not submitted when false. When checked, submitted to server as 'on' if no value provided. */}
            <input type="checkbox" name={`${index}-${type}-dbInsert`} checked={dbInsert} readOnly /> {/* Not submitted when false. When checked, submitted to server as 'on' if no value provided. */}
            <input type="text" name={`${index}-${type}-id`} value={id} readOnly /* hidden */ />
            <div className="mr-2">
                <label htmlFor="size">Iframe Type</label>
                <select id="iframetype" className="bg-gray-100" name={`${index}-${type}-iframetype`} value={iframetype} onChange={handleIframeTypeUpdate}>
                    <option>video</option>
                    <option>maps</option>
                </select>
            </div>
            <FlexTextArea
                id="url"
                name={`${index}-${type}-url`}
                value={url ?? ""}
                changeHandler={handleUrlUpdate}
                showLabel={true}
                visualName="Url"
                minLength={1}
                maxLength={255}
                allowEnter={false}
                textSize="p"
                textStyle="normal"
                error={errors?.url}
            />
            <FlexTextArea
                id="title"
                name={`${index}-${type}-title`}
                value={title ?? ""}
                changeHandler={handleTitleUpdate}
                showLabel={true}
                visualName="Title"
                minLength={1}
                maxLength={255}
                allowEnter={false}
                textSize="p"
                textStyle="normal"
                error={errors?.title}
            />
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