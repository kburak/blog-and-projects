'use client'

import { useState } from "react";
import { useFormState } from 'react-dom';
import { State, createBlog } from "../lib/actions";
import EditImage from "./editImage";
import EditText from "./editText";
import EditCode from "./editCode";
import { ContentType } from "../lib/definitions";
import FlexTextAreaStateful from "./flexTextAreaStateful";

export default function EditBlogForm(props: any) {
    const { blogData } = props;
    const initialState: State = { message: "", errors: {} };
    const [state, dispatch] = useFormState(createBlog, initialState);
    const [content, setContent] = useState<ContentType[]>(populateContentState);
    /*
        Content State
        [
            {textContent},
            {imageContent}
        ]
    */

    function populateContentState() {
        /* Populate content arr with already existing content elements and return it. */
        // console.log(blogData.content);
        // Sort blog data, position ascending
        blogData.content.sort((a: any, b: any) => a.position - b.position);

        const populatedState = [];

        // Iterate sorted data
        for (let c of blogData.content) {
            console.log("c", c);
            // Extract type
            const { contenttype: type } = c;

            // Extract other values according to type and create new objects and push them into result arr.
            switch (type) {
                case 'image':
                    populatedState.push({
                        type: "image",
                        url: c.custom_attr.url,
                        caption: c.custom_attr.caption,
                        size: c.custom_attr.size,
                        dbUpdate: false,
                        dbDelete: false
                    });
                    break;
                case 'text':
                    populatedState.push({
                        type: "text",
                        content: c.custom_attr.content,
                        size: c.custom_attr.size,
                        style: c.custom_attr.style,
                        dbUpdate: false,
                        dbDelete: false
                    });
                    break;
                case 'code':
                    populatedState.push({
                        type: "code",
                        code: c.custom_attr.code,
                        language: c.custom_attr.language,
                        dbUpdate: false,
                        dbDelete: false
                    });
                    break;
            }
        }
        
        return populatedState;
    }

    function addEmptyContent(contentType: string) {
        const typeMap: { [key: string]: ContentType } = {
            "image": { type: "image", url: "", caption: "", size: "large", dbUpdate: false, dbDelete: false },
            "text": { type: "text", content: "", size: "p", style: "normal", dbUpdate: false, dbDelete: false },
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

    function removeContent(type: string, index: number, revert: boolean) {
        
        // Find the content element with index and set its dbDelete to true
        setContent((prevState) => {
            return prevState.map((sC, sIdx) => {
                if(sIdx === index){
                    sC.dbDelete = true;
                }
                return sC;
            })
        });

    }

    function editContent(type: string, index: number, ...args: string[]) {
        console.log("editContent", type, index, args);
        if (type === "image") {
            const [url, caption, size] = args;

            // Update contentState with new parameters
            setContent(prevState => {
                return prevState.map((sC, sIdx) => {
                    if (sIdx === index && sC.type === type) return { ...sC, url, caption, size, dbUpdate: true }; // ADD !!!! Set dbUpdate to true
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
            const [content, size, style] = args;

            // Update contentState with new parameters
            setContent(prevState => {
                return prevState.map((sC, sIdx) => {
                    if (sIdx === index && sC.type === type) return { ...sC, content, size, style, dbUpdate: true }; // ADD !!!! Set dbUpdate to true
                    return sC;
                })
            });
        } else if (type === "code") {
            const [code, language] = args;

            // Update contentState with new parameters
            setContent(prevState => {
                return prevState.map((sC, sIdx) => {
                    if (sIdx === index && sC.type === type) return { ...sC, code, language, dbUpdate: true }; // ADD !!!! Set dbUpdate to true
                    return sC;
                })
            });
        }
    }

    console.log(blogData);
    return (
        <form action={dispatch} className="flex flex-col p-2">
            <FlexTextAreaStateful
                id='title'
                name='blog-title'
                initValue={blogData.title}
                showLabel={true}
                visualName='Title'
                minLength={10}
                maxLength={255}
                allowEnter={false}
                textSize="h1"
                textStyle="normal"
                error={state?.errors?.title}
            />
            <FlexTextAreaStateful
                id='summary'
                name='blog-summary'
                initValue={blogData.summary}
                showLabel={true}
                visualName='Summary'
                minLength={10}
                maxLength={255}
                allowEnter={false}
                textSize="p"
                textStyle="normal"
                error={state?.errors?.summary}
            />

            {/* Content */}
            {/* 
                Iterate content array and show them in their format.
                Each should have option to be deleted.
                Show always in edit mode.
            */}
            {
                content.map((c, idx) => {
                    if (c.type === "image") return (
                        <div key={`content-${idx}`} className="border-2 border-dashed border-teal-700">
                            <EditImage
                                key={`emptyImage-${idx}`}
                                type={c.type}
                                index={idx}
                                dbUpdate={c.dbUpdate}
                                dbDelete={c.dbDelete}
                                url={c.url}
                                caption={c.caption}
                                size={c.size}
                                update={editContent}
                                remove={removeContent}
                                errors={state?.errors?.content && state.errors.content[idx] && state.errors.content[idx]}
                            />
                        </div>
                    );
                    if (c.type === "text") return (
                        <div key={`content-${idx}`} className="border-2 border-dashed border-teal-700">
                            <EditText
                                key={`emptyText-${idx}`}
                                type={c.type}
                                index={idx}
                                dbUpdate={c.dbUpdate}
                                dbDelete={c.dbDelete}
                                content={c.content}
                                size={c.size}
                                style={c.style}
                                update={editContent}
                                remove={removeContent}
                                errors={state?.errors?.content && state.errors.content[idx] && state.errors.content[idx]}
                            />
                        </div>
                    );
                    if (c.type === "code") return (
                        <div key={`content-${idx}`} className="border-2 border-dashed border-teal-700">
                            <EditCode
                                key={`emptyCode-${idx}`}
                                type={c.type}
                                index={idx}
                                dbUpdate={c.dbUpdate}
                                dbDelete={c.dbDelete}
                                code={c.code}
                                language={c.language}
                                update={editContent}
                                remove={removeContent}
                                errors={state?.errors?.content && state.errors.content[idx] && state.errors.content[idx]}
                            />
                        </div>
                    );
                })
            }

            {/* Helper for Selecting content type*/}
            <div id='add-new-content'>
                {/* Helper for Selecting content type*/}
                {
                    ["image", "text", "code"].map(c_type => {
                        return <button
                            key={`button-${c_type}`}
                            className="h-10 rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                            type="button" // This will override/prevent its natural behaviour(submitting the form it's in.)
                            onClick={(e) => {
                                addEmptyContent(c_type)
                            }}>{c_type}</button>;
                    })
                }
                <button
                    className="h-10 rounded-lg bg-green-500 px-4 text-sm font-medium text-white transition-colors hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 active:bg-green-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                >
                    Save
                </button>
                <p>{JSON.stringify(state)}</p>
            </div>
        </form>
    );
}