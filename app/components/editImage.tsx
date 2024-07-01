import FlexTextArea from "./flexTextArea";
import Image from 'next/image';
import imageSizeMap from "../lib/imageSizeMap";

export default function editImage({
    type,
    index,
    dbUpdate,
    dbDelete,
    url,
    caption,
    size,
    update,
    remove,
    errors
}: {
    type: string | undefined,
    index: number,
    dbUpdate: boolean | undefined,
    dbDelete: boolean | undefined,
    url: string | undefined,
    caption: string | undefined,
    size: string | undefined,
    update: (...args: any) => void,
    remove: (...args: any) => void,
    errors: { [key: string]: string }
}) {

    function handleRemove(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        remove("image", index);
    }

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
        <div className="p-4 relative">{/* // If to be deleted hide content. */}
            <p>{type?.toUpperCase()}</p>
            <input type="checkbox" name={`${index}-${type}-dbUpdate`} checked={dbUpdate} readOnly /> {/* Not submitted when false. When checked, submitted to server as 'on' if no value provided. */}
            <input type="checkbox" name={`${index}-${type}-dbDelete`} checked={dbDelete} readOnly /> {/* Not submitted when false. When checked, submitted to server as 'on' if no value provided. */}
            {url &&
                <Image
                    src={url}
                    width={imageSizeMap[size || "large"].width}
                    height={imageSizeMap[size || "large"].height}
                    className="pt-2 pb-2 mt-0 ml-auto mr-auto mb-0"
                    alt={caption ?? ""}
                />
            }
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
                id="caption"
                name={`${index}-${type}-caption`}
                value={caption ?? ""}
                changeHandler={handleCaptionUpdate}
                showLabel={true}
                visualName="Caption"
                minLength={1}
                maxLength={255}
                allowEnter={false}
                textSize="p"
                textStyle="normal"
                error={errors?.caption}
            />
            <label htmlFor="size">Size</label>
            <select id="size" className="bg-gray-100" name={`${index}-${type}-size`} value={size} onChange={handleSizeUpdate}>
                <option>small</option>
                <option>medium</option>
                <option>large</option>
            </select>
            <button type="button" className="h-5 rounded-lg bg-red-500 px-4 text-sm font-medium text-white transition-colors hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 active:bg-red-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50" name={`${index}-${type}-dbDelete`} onClick={handleRemove}>Delete</button>
            {dbDelete &&
                <div className="flex flex-col items-center justify-center absolute bg-black bg-opacity-50 absolute inset-0">
                    <p className="text-white">Mark to be deleted.</p>
                    <button className="text-white h-5 rounded-lg bg-red-500 px-4" type="button">Revert</button>
                </div>
            }
        </div>
    );
}