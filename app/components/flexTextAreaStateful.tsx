/*
    FlexTextArea with its own state.
*/

import { useRef, useState, useEffect } from 'react';

export default function FlexTextAreaStateful({
    id,
    name,
    initValue,
    showLabel,
    visualName,
    minLength,
    maxLength,
    allowEnter,
    textSize,
    textStyle,
    error
}: {
    id: string,
    name: string,
    initValue?: string,
    showLabel: Boolean,
    visualName: string,
    minLength: number,
    maxLength: number,
    allowEnter: Boolean,
    textSize: string,
    textStyle: string
    error: string | []
}) {

    const [value, setValue] = useState(initValue ?? "");
    const mirrorElm = useRef<HTMLTextAreaElement>(null);
    const mainElm = useRef<HTMLTextAreaElement>(null);

    const textSizeMap: { [key: string]: string } = {
        "h1": "text-4xl",
        "h2": "text-3xl",
        "h3": "text-2xl",
        "h4": "text-xl",
        "h5": "text-lg",
        "p": "text-base"
    };

    const textStyleMap: { [key: string]: string } = {
        "normal": "normal",
        "italic": "italic",
        "bold": "font-bold"
    }

    // Set the height of mainElm(textarea) to be the scrollHeight of the mirrorElm. Do this at first render.
    useEffect(() => {
        if (mirrorElm.current && mainElm.current) {
            mainElm.current.style.height = `${mirrorElm.current.scrollHeight}px`;
        }
    }, []);


    return (
        <div id={id} className="flex flex-col">
            {/* Blog title */}
            {showLabel && <label htmlFor={id}>{visualName}</label>}
            <div className='relative'> {/* Relative position creates a new positioning context for its absolute position children. */}
                <textarea
                    ref={mainElm}
                    id={id}
                    name={name}
                    className={`${textSizeMap[textSize]} ${textStyleMap[textStyle]} bg-green-100 resize-none w-full`}
                    autoFocus={true}
                    autoComplete="off"
                    minLength={minLength}
                    maxLength={maxLength}
                    value={value}
                    style={{
                        height: mirrorElm.current ? mirrorElm.current.scrollHeight + "px" : "2.5rem"
                    }}
                    onKeyDown={(e) => {
                        if (!allowEnter) {
                            // Ignore enter so no new lines can be made
                            if (e.key === "Enter") e.preventDefault();
                        }
                    }}
                    onChange={(e) => {
                        setValue(e.target.value);

                        // console.log("onChange",mirrorElm.current && mirrorElm.current.scrollHeight);
                    }}
                />
                <textarea
                    ref={mirrorElm}
                    className={`resize-none ${textSize} w-full absolute block -top-[9999px] invisible`} // -top-[9999px] invisible
                    value={value}
                    readOnly
                ></textarea>
            </div>
            {error && typeof error !== "string" ?
                error.map((error: string) => (
                    <p className="mb-2 text-sm text-red-500" key={error}>
                        {error}
                    </p>
                ))
                :
                <p className="mb-2 text-sm text-red-500" key={error}>
                    {error}
                </p>
            }
        </div>
    );
}