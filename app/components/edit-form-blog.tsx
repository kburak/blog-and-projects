'use client'

import { useState } from "react";
import { useFormState } from 'react-dom';
import { State, editBlog } from "../lib/actions";
import EditImage from "./editImage";
import EditText from "./editText";
import EditCode from "./editCode";
import EditIFrame from "./editIframe";
import { ContentType } from "../lib/definitions";
import FlexTextAreaStateful from "./flexTextAreaStateful";
import TagSelector from "./TagSelector";

export default function EditBlogForm(props: any) {
    const { blogData, allTags, postTags } = props;
    const initialState: State = { message: "", errors: {} };
    const editBlogWithData = editBlog.bind(null, [blogData.id, blogData.slug]);
    const [state, dispatch] = useFormState(editBlogWithData, initialState);
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

        const populatedState = [];

        // Iterate sorted data
        for (let c of blogData.content) {
            // console.log("c", c);
            // Extract type
            const { contenttype: type } = c;

            // Extract other values according to type and create new objects and push them into result arr.
            switch (type) {
                case 'image':
                    populatedState.push({
                        id: c.id,
                        type: "image",
                        url: c.custom_attr.url,
                        caption: c.custom_attr.caption,
                        size: c.custom_attr.size,
                        dbUpdate: false,
                        dbDelete: false,
                        dbInsert: false
                    });
                    break;
                case 'text':
                    populatedState.push({
                        id: c.id,
                        type: "text",
                        content: c.custom_attr.content,
                        size: c.custom_attr.size,
                        style: c.custom_attr.style,
                        dbUpdate: false,
                        dbDelete: false,
                        dbInsert: false
                    });
                    break;
                case 'code':
                    populatedState.push({
                        id: c.id,
                        type: "code",
                        code: c.custom_attr.code,
                        language: c.custom_attr.language,
                        dbUpdate: false,
                        dbDelete: false,
                        dbInsert: false
                    });
                    break;
                case 'iframe':
                    populatedState.push({
                        id: c.id,
                        type: "iframe",
                        iframetype: c.custom_attr.iframetype,
                        url: c.custom_attr.url,
                        title: c.custom_attr.title,
                        dbUpdate: false,
                        dbDelete: false,
                        dbInsert: false
                    });
                    break;
            }
        }

        return populatedState;
    }

    function addEmptyContent(contentType: string) {
        const typeMap: { [key: string]: ContentType } = {
            "image": { type: "image", url: "", caption: "", size: "large", dbUpdate: false, dbDelete: false, dbInsert: true },
            "text": { type: "text", content: "", size: "p", style: "normal", dbUpdate: false, dbDelete: false, dbInsert: true },
            "code": { type: "code", code: "", language: "", dbUpdate: false, dbDelete: false, dbInsert: true },
            "iframe": { type: "iframe", iframetype: "video", url: "", title: "", dbDelete: false, dbInsert: true }
        }

        setContent((prevState) => {
            return [...prevState, { ...typeMap[contentType] }]
        });
        // +++++ DEBUG +++++
        console.log(setContent(prevState => {
            console.log(prevState);
            return prevState;
        }));
        // +++++ DEBUG +++++
    }

    function removeContent(type: string, index: number, revert: boolean = false, dbInsert: boolean) {

        // Is the new content to be added? It was not existing! (dbInsert: true)
        if (dbInsert) {
            // Just remove it from state
            setContent((prevState) => {
                return prevState.filter((sC, sIdx) => sIdx !== index);
            });
        } else {
            // Find the content element with index and set its dbDelete to true
            setContent((prevState) => {
                return prevState.map((sC, sIdx) => {
                    if (sIdx === index && sC.type === type) {
                        sC.dbDelete = revert ? false : true; // Set to false if revert is requested.
                    }
                    return sC;
                });
            });
        }
    }

    function editContent(type: string, index: number, ...args: string[]) {
        console.log("editContent", type, index, args);
        if (type === "image") {
            const [url, caption, size] = args;

            // Update contentState with new parameters
            setContent(prevState => {
                return prevState.map((sC, sIdx) => {
                    if (sIdx === index && sC.type === type) return { ...sC, url, caption, size, dbUpdate: !sC.dbInsert && true }; // Set dbUpdate to true only if item existed already.
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
                    if (sIdx === index && sC.type === type) return { ...sC, content, size, style, dbUpdate: !sC.dbInsert && true }; // Set dbUpdate to true only if item existed already.
                    return sC;
                })
            });
        } else if (type === "code") {
            const [code, language] = args;

            // Update contentState with new parameters
            setContent(prevState => {
                return prevState.map((sC, sIdx) => {
                    if (sIdx === index && sC.type === type) return { ...sC, code, language, dbUpdate: !sC.dbInsert && true }; // Set dbUpdate to true only if item existed already.
                    return sC;
                })
            });
        } else if (type === "iframe") {
            const [iframetype, url, title] = args;

            // Update contentState with new parameters
            setContent(prevState => {
                return prevState.map((sC, sIdx) => {
                    if (sIdx === index && sC.type === type) return { ...sC, iframetype, url, title, dbUpdate: !sC.dbInsert && true }; // Set dbUpdate to true only if item existed already.
                    return sC;
                })
            });
        }
    }

    // console.log(blogData);
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
            <FlexTextAreaStateful
                id='header'
                name='blog-header'
                initValue={blogData.header}
                showLabel={true}
                visualName='Header'
                minLength={10}
                maxLength={255}
                allowEnter={false}
                textSize="p"
                textStyle="normal"
                error={state?.errors?.header}
            />
            <TagSelector
                allTags={allTags}
                initSelTags={postTags}
                errors={state?.errors?.tags}
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
                                id={c.id}
                                index={idx}
                                dbUpdate={c.dbUpdate}
                                dbDelete={c.dbDelete}
                                dbInsert={c.dbInsert}
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
                                id={c.id}
                                index={idx}
                                dbUpdate={c.dbUpdate}
                                dbDelete={c.dbDelete}
                                dbInsert={c.dbInsert}
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
                                id={c.id}
                                index={idx}
                                dbUpdate={c.dbUpdate}
                                dbDelete={c.dbDelete}
                                dbInsert={c.dbInsert}
                                code={c.code}
                                language={c.language}
                                update={editContent}
                                remove={removeContent}
                                errors={state?.errors?.content && state.errors.content[idx] && state.errors.content[idx]}
                            />
                        </div>
                    );
                    if (c.type === "iframe") return (
                        <div key={`content-${idx}`} className="border-2 border-dashed border-teal-700">
                            <EditIFrame
                                key={`emptyIframe-${idx}`}
                                type={c.type}
                                id={c.id}
                                index={idx}
                                dbUpdate={c.dbUpdate}
                                dbDelete={c.dbDelete}
                                dbInsert={c.dbInsert}
                                iframetype={c.iframetype}
                                url={c.url}
                                title={c.title}
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
                    ["image", "text", "code", "iframe"].map(c_type => {
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