'use client'

import { useState } from "react";
import { useFormState } from "react-dom";
import { createBlog } from "../lib/actions";
import EditImage from "./editImage";
import EditText from "./editText";
import EditCode from "./editCode";

type ContentType = {
    type: string;
    url?: string;
    caption?: string;
    content?: string;
    formatting?: string;
    code?: string;
    language?: string;
    size?: string;
};

export default function CreateBlogForm() {
    const initialState = { message: "", errors: {} };
    const contentInitialState: ContentType[] = [];
    const [state, dispatch] = useFormState(createBlog, initialState);
    const [content, setContent] = useState<ContentType[]>(contentInitialState);
    /*
        Content State
        [
            {textContent},
            {imageContent}
        ]
    */

    function addEmptyContent(contentType: string) {

        const typeMap: { [key: string]: ContentType } = {
            "image": { type: "image", url: "", caption: "", size: "" },
            "text": { type: "text", content: "", formatting: "" },
            "code": { type: "code", code: "", language: "" }
        }

        setContent((prevState) => {
            return [...prevState, typeMap[contentType]]
        });
    }

    function editContent(type: string, index: Number, ...args: string[]) {
        // console.log("editContent", type, index, args);
        if (type === "image") {
            const [url, caption, size] = args;

            // Update contentState with new parameters
            setContent(prevState => {
                return prevState.map((sC, sIdx) => {
                    if (sIdx === index && sC.type === type) return { ...sC, url, caption, size };
                    return sC;
                })
            });
            // +++++ DEBUG +++++ 
            setContent(prevState => {
                console.log("create-form-blog-content-state:", prevState);
                return prevState;
            });
            // +++++ DEBUG +++++ 
        } else if (type === "text") {
            const [content, formatting] = args;

            // Update contentState with new parameters
            setContent(prevState => {
                return prevState.map((sC, sIdx) => {
                    if (sIdx === index && sC.type === type) return { ...sC, content, formatting };
                    return sC;
                })
            });
            // +++++ DEBUG +++++ 
            setContent(prevState => {
                console.log("create-form-blog-content-state:", prevState);
                return prevState;
            });
            // +++++ DEBUG +++++ 
        } else if (type === "code") {
            const [code, language] = args;

            // Update contentState with new parameters
            setContent(prevState => {
                return prevState.map((sC, sIdx) => {
                    if (sIdx === index && sC.type === type) return { ...sC, code, language };
                    return sC;
                })
            });
            // +++++ DEBUG +++++ 
            setContent(prevState => {
                console.log("create-form-blog-content-state:", prevState);
                return prevState;
            });
            // +++++ DEBUG +++++ 
        }
    }

    return (
        <form action={dispatch}>
            {/* Blog title */}
            <label htmlFor="title">Title</label>
            <input type="text" id="title" />
            {/* Summary */}
            <label htmlFor="summary">Summary</label>
            <textarea id="summary" />

            <hr />
            {/* Content */}

            {/* 
                Iterate content array and show them in their format.
                Each should have option to be deleted.
                Show always in edit mode.
            */}
            {
                content.map((c, idx) => {
                    if (c.type === "image") return <EditImage key={`emptyImage-${idx}`} type={c.type} index={idx} url={c.url} caption={c.caption} size={"small"} update={editContent} />;
                    if (c.type === "text") return <EditText key={`emptyText-${idx}`} type={c.type} index={idx} content={c.content} formatting={c.formatting} update={editContent} />;
                    if (c.type === "code") return <EditCode key={`emptyCode-${idx}`} type={c.type} index={idx} code={c.code} language={c.language} update={editContent} />;
                })
            }

            {/* Helper for Selecting content type*/}
            {
                ["image", "text", "code"].map(c_type => {
                    return <button
                        key={`button-${c_type}`}
                        type="button" // This will override/prevent its natural behaviour(submitting the form it's in.)
                        onClick={(e) => {
                            addEmptyContent(c_type)
                        }}>{c_type}</button>;
                })
            }

        </form>
    );
}