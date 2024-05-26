'use client'

import { useState } from "react";
import { useFormState } from "react-dom";
import { createBlog } from "../lib/actions";

type ContentType = {
    type: string;
    url?: string;
    caption?: string;
    content?: string;
    formatting?: string[];
    code?: string;
    language?: string[];
};

export default function CreateBlog() {
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
            "image": { type: "image", url: "", caption: "" },
            "text": { type: "text", content: "", formatting: ["h1", "p"] },
            "code": { type: "code", code: "", language: ["javascript", "json"] }
        }

        setContent((prevState) => {
            return [...prevState, typeMap[contentType]]
        });
    }

    return (
        <form action={dispatch}>
            {/* Blog title */}

            {/* Summary */}

            {/* Content */}

            {/* 
                Iterate content array and show them in their format.
                Each should have option to be deleted.
                Show always in edit mode.
            */}
            {
                content.map((c, idx) => {
                    return (
                        <p key={`content-${c.type}-${idx}`}>{c.type}</p>
                    );
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