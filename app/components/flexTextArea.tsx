/*
    FlexTextArea WITHOUT its own state. 
    It takes value and update func. as prop and uses them.
*/

import { useRef } from 'react';

export default function FlexTextArea({
    id,
    name,
    value,
    changeHandler,
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
    value: string,
    changeHandler: (...args: any) => void,
    showLabel: Boolean,
    visualName: string,
    minLength: number,
    maxLength: number,
    allowEnter: Boolean,
    textSize: string,
    textStyle: string,
    error: string | []
}) {

    const mirrorElm = useRef<HTMLTextAreaElement>(null);

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

    return (
        <div id={id} className="flex flex-col w-full md:max-w-2xl lg:max-w-4xl mt-0 mb-0 ml-auto mr-auto">
            {/* Blog title */}
            {showLabel && <label htmlFor={id}>{visualName}</label>}
            <div className='relative'> {/* Relative position creates a new positioning context for its absolute position children. */}
                <textarea
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
                        changeHandler(e);
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
                    <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                    </p>
                ))
                :
                <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                </p>
            }
        </div>
    );
}