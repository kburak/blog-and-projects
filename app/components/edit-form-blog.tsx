'use client'

import { useState } from "react";
import { useFormState } from 'react-dom';
import { State, createBlog } from "../lib/actions";
import EditImage from "./editImage";
import EditText from "./editText";
import EditCode from "./editCode";
import { ContentType } from "../lib/definitions";

export default function EditBlogForm(/*{blog} */) {
    const initialState: State = { message: "", errors: {} };
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

    function populateContentState(){
        // Populate content arr with already existing content elements
    }

    function addEmptyContent(contentType: string) {
        const typeMap: { [key: string]: ContentType } = {
            "image": { type: "image", url: "", caption: "", size: "", dbUpdate: false, dbDelete: false },
            "text": { type: "text", content: "", formatting: "", dbUpdate: false, dbDelete: false },
            "code": { type: "code", code: "", language: "", dbUpdate: false, dbDelete: false }
        }

        setContent((prevState) => {
            return [...prevState, typeMap[contentType]]
        });
        // +++++ DEBUG +++++
        console.log(setContent(prevState => {
            console.log(prevState);
            return prevState;
        }));
        // +++++ DEBUG +++++
    }

    function removeContent(type: string, index: number) {
        // Set dbDelete to true


    }

    function editContent(type: string, index: number, ...args: string[]) {
        console.log("editContent", type, index, args);
        if (type === "image") {
            const [url, caption, size] = args;

            // Update contentState with new parameters
            setContent(prevState => {
                return prevState.map((sC, sIdx) => {
                    if (sIdx === index && sC.type === type) return { ...sC, url, caption, size }; // ADD !!!! Set dbUpdate to true
                    return sC;
                })
            });
            // +++++ DEBUG +++++
            console.log(setContent(prevState => {
                console.log(prevState);
                return prevState;
            }));
            // +++++ DEBUG +++++
        } else if (type === "text") {
            const [content, formatting] = args;

            // Update contentState with new parameters
            setContent(prevState => {
                return prevState.map((sC, sIdx) => {
                    if (sIdx === index && sC.type === type) return { ...sC, content, formatting }; // ADD !!!! Set dbUpdate to true
                    return sC;
                })
            });
        } else if (type === "code") {
            const [code, language] = args;

            // Update contentState with new parameters
            setContent(prevState => {
                return prevState.map((sC, sIdx) => {
                    if (sIdx === index && sC.type === type) return { ...sC, code, language }; // ADD !!!! Set dbUpdate to true
                    return sC;
                })
            });
        }
    }

    return (
        <form action={dispatch}>
            {/* Blog title */}
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="blog-title" />
            {state?.errors?.title &&
                state.errors.title.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                    </p>
                ))}

            {/* Summary */}
            <label htmlFor="summary">Summary</label>
            <textarea id="summary" name="blog-summary" />
            {state?.errors?.summary &&
                state.errors.summary.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                    </p>
                ))}

            <hr />

            {/* Content */}
            {/* 
                Iterate content array and show them in their format.
                Each should have option to be deleted.
                Show always in edit mode.
            */}
            {
                content.map((c, idx) => {
                    if (c.type === "image") return (
                        <div key={`content-${idx}`}>
                            <EditImage key={`emptyImage-${idx}`} type={c.type} index={idx} dbUpdate={c.dbUpdate} dbDelete={c.dbDelete} url={c.url} caption={c.caption} size={"small"} update={editContent} remove={removeContent} />
                            <ul>
                                {
                                    state?.errors?.content && state.errors.content[idx] &&
                                    state.errors.content[idx].map((err: string) => (
                                        <li className="mt-2 text-sm text-red-500" key={err}>
                                            {err}
                                        </li>
                                    ))

                                }
                            </ul>
                        </div>
                    );
                    if (c.type === "text") return (
                        <div key={`content-${idx}`}>
                            <EditText key={`emptyText-${idx}`} type={c.type} index={idx} content={c.content} formatting={c.formatting} update={editContent} />
                            <ul>
                                {
                                    state?.errors?.content && state.errors.content[idx] &&
                                    state.errors.content[idx].map((err: string) => (
                                        <li className="mt-2 text-sm text-red-500" key={err}>
                                            {err}
                                        </li>
                                    ))

                                }
                            </ul>
                        </div>
                    );
                    if (c.type === "code") return (
                        <div key={`content-${idx}`}>
                            <EditCode key={`emptyCode-${idx}`} type={c.type} index={idx} code={c.code} language={c.language} update={editContent} />
                            <ul>
                                {
                                    state?.errors?.content && state.errors.content[idx] &&
                                    state.errors.content[idx].map((err: string) => (
                                        <li className="mt-2 text-sm text-red-500" key={err}>
                                            {err}
                                        </li>
                                    ))

                                }
                            </ul>
                        </div>
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
            <button>Save</button>
            <p>{JSON.stringify(state)}</p>
        </form>
    );
}