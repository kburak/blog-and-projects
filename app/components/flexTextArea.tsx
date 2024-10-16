/*
    FlexTextArea WITHOUT its own state. 
    It takes value and update func. as prop and uses them.
*/

import { useRef, useEffect } from 'react';

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
    showInlineStyleOptions,
    error
}: {
    id: string,
    name: string,
    value: string,
    changeHandler: (...args: any) => void,
    showLabel: boolean,
    visualName: string,
    minLength: number,
    maxLength: number,
    allowEnter: boolean,
    textSize: string,
    textStyle: string,
    showInlineStyleOptions?: boolean
    error: string | []
}) {

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

    function makeStyle(type: string) {

        const textarea = mainElm.current;
        const startIdx = textarea?.selectionStart;
        const endIdx = textarea?.selectionEnd;
        console.log("start:", startIdx, "end:", endIdx);

        if (textarea && (startIdx !== undefined && endIdx !== undefined) && (startIdx >= 0 && endIdx > startIdx)) {

            // Extract selected str
            const str = textarea?.value.substring(startIdx, endIdx);
            let wrapped;

            // Wrap str into html tag depending on type
            if (type === "a") {
                // Make Link
                wrapped = `<a href="" target="_blank">${str}</a>`
            } else if (type === "strong") {
                // Make strong
                wrapped = `<strong>${str}</strong>`
            }

            // Replace the str with wrapped version in the textarea
            const startStr = textarea?.value.substring(0, startIdx);
            const rest = textarea?.value.substring(endIdx);
            const newValue = startStr + wrapped + rest;

            // Create an event obj instance and send it to changeHandler so that the state is updated.
            const fakeEvent = new Event('change', { bubbles: true, cancelable: true });
            Object.defineProperty(fakeEvent, 'target', {
                writable: false, // true if the value associated with the property may be changed with an assignment operator. Like: fakeEvent.target.value = "asdasdasdas"
                value: { value: newValue }
            });
            changeHandler(fakeEvent);
        }

    }

    // Set the height of mainElm(textarea) to be the scrollHeight of the mirrorElm. Do this at first render.
    useEffect(() => {
        if (mirrorElm.current && mainElm.current) {
            mainElm.current.style.height = `${mirrorElm.current.scrollHeight}px`;
        }
    }, []);

    return (
        <div>
            {/* Inline Style Buttons */}
            {showInlineStyleOptions &&
                <div id="inlineStyleOptionButton" className='mt-4 mb-2'>
                    <button type="button" className="bg-gray-200 rounded mr-1 inline" onClick={() => { makeStyle("a") }}>{"<a>"}</button>
                    <button type="button" className="bg-gray-200 rounded mr-1 inline" onClick={() => { makeStyle("strong") }}>{"<strong>"}</button>
                </div>
            }
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
                        <p className="text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))
                    :
                    <p className="mb-2 text-sm text-red-500" key={error}>
                        {error}
                    </p>
                }
            </div>
        </div>
    );
}