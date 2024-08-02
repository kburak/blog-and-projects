import FlexTextArea from "./flexTextArea";
import Image from 'next/image';
import imageSizeMap from "../lib/imageSizeMap";
import { useState, useEffect } from "react";
import fetch from 'node-fetch';

export default function editImage({
    type,
    id,
    index,
    dbUpdate,
    dbDelete,
    dbInsert,
    url,
    caption,
    size,
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
    url: string | undefined,
    caption: string | undefined,
    size: string | undefined,
    update: (...args: any) => void,
    remove: (...args: any) => void,
    errors: { [key: string]: string }
}) {

    const [renderImage, setRenderImage] = useState(false);

    function handleRemove(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        remove(type, index, false, dbInsert);
    }

    function handleRemoveRevert(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        remove(type, index, true);
    }

    function handleUrlUpdate(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        // Set renderImage to false with every url change so that it can be revalidated.
        setRenderImage(false);
        update(type, index, e.target?.value, caption, size);
    }

    function handleCaptionUpdate(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        update(type, index, url, e.target?.value, size);
    }

    function handleSizeUpdate(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();
        update(type, index, url, caption, e.target?.value);
    }

    async function validateImgUrl() {
        // console.log("Run validateImgUrl");
        try {
            if (url) {
                const res = await fetch(url);
                if (res.ok === true) {
                    // Show / Render image
                    setRenderImage(true);
                }
            }
        } catch (e) {
            setRenderImage(false);
        }
    }

    useEffect(() => {

        // Validate image url every time url changes
        validateImgUrl();

    }, [url]);

    return (
        <div className="p-4 relative">{/* // If to be deleted hide content. */}
            <p>{type?.toUpperCase()}</p>
            <input type="checkbox" name={`${index}-${type}-dbUpdate`} checked={dbUpdate} readOnly /> {/* Not submitted when false. When checked, submitted to server as 'on' if no value provided. */}
            <input type="checkbox" name={`${index}-${type}-dbDelete`} checked={dbDelete} readOnly /> {/* Not submitted when false. When checked, submitted to server as 'on' if no value provided. */}
            <input type="checkbox" name={`${index}-${type}-dbInsert`} checked={dbInsert} readOnly /> {/* Not submitted when false. When checked, submitted to server as 'on' if no value provided. */}
            <input type="text" name={`${index}-${type}-id`} value={id} readOnly /* hidden */ />
            {url && renderImage &&
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
            <div className="mr-2">
                <label htmlFor="size">Size</label>
                <select id="size" className="bg-gray-100" name={`${index}-${type}-size`} value={size} onChange={handleSizeUpdate}>
                    <option>small</option>
                    <option>medium</option>
                    <option>large</option>
                </select>
            </div>
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