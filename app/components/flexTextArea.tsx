import { useRef, useState } from 'react';

export default function FlexTextArea({
    id,
    name,
    showLabel,
    visualName,
    minLength,
    maxLength,
    allowEnter,
    errors
}: {
    id: string,
    name: string,
    showLabel: Boolean,
    visualName: string,
    minLength: number,
    maxLength: number,
    allowEnter: Boolean,
    errors: []
}) {

    const [value, setValue] = useState("");
    const mirrorElm = useRef<HTMLTextAreaElement>(null);

    return (
        <div id={id} className="flex flex-col w-full md:max-w-2xl lg:max-w-4xl mt-0 mb-0 ml-auto mr-auto">
            {/* Blog title */}
            {showLabel && <label htmlFor={id}>{visualName}</label>}
            <div className='relative'> {/* Relative position creates a new positioning context for its absolute position children. */}
                <textarea
                    id={id}
                    name={name}
                    className="text-3xl resize-none w-full"
                    autoFocus={true}
                    autoComplete="off"
                    minLength={minLength}
                    maxLength={maxLength}
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
                    }}
                />
                <textarea
                    ref={mirrorElm}
                    className="resize-none text-3xl w-full absolute block -top-[9999px] invisible" // -top-[9999px] invisible
                    value={value}
                    readOnly
                ></textarea>
            </div>
            {errors &&
                errors.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                    </p>
                ))}

        </div>
    );
}