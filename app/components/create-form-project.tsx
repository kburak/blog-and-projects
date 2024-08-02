'use client'

import { useState } from "react";
import { useFormState } from 'react-dom';
import { State, createProject } from "../lib/actions";
import EditImage from "./editImage";
import EditText from "./editText";
import EditCode from "./editCode";
import EditIFrame from "./editIframe";
import { ContentType } from "../lib/definitions";
import FlexTextAreaStateful from "./flexTextAreaStateful";

export default function CreateProjectForm() {
    const initialState: State = { message: "", errors: {} };
    const contentInitialState: ContentType[] = [];
    const [state, dispatch] = useFormState(createProject, initialState);
    const [content, setContent] = useState<ContentType[]>(contentInitialState);

    function addEmptyContent(contentType: string) {
        const typeMap: { [key: string]: ContentType } = {
            "image": { type: "image", url: "", caption: "", size: "large", dbUpdate: false, dbDelete: false, dbInsert: true },
            "text": { type: "text", content: "", size: "p", style: "normal", dbUpdate: false, dbDelete: false, dbInsert: true },
            "code": { type: "code", code: "", language: "", dbUpdate: false, dbDelete: false, dbInsert: true },
            "iframe": { type: "iframe", iframetype: "video", url: "", title: "", dbDelete: false, dbInsert: true }
        }

        setContent((prevState) => {
            return [...prevState, { ...typeMap[contentType] }];
        });
        // +++++ DEBUG +++++
        console.log(setContent(prevState => {
            console.log(prevState);
            return prevState;
        }));
        // +++++ DEBUG +++++
    }

    function removeContent(type: string, index: number) {
        console.log("removeContent", type, index);
        setContent(prevState => {
            return prevState.filter((c, idx) => (idx !== index));
        });
        // +++++ DEBUG +++++
        console.log(setContent(prevState => {
            console.log(prevState);
            return prevState;
        }));
        // +++++ DEBUG +++++
    }

    function editContent(type: string, index: number, ...args: string[]) {
        console.log("editContent", type, index, args);
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
                    if (sIdx === index && sC.type === type) return { ...sC, content, size, style };
                    return sC;
                })
            });
        } else if (type === "code") {
            const [code, language] = args;

            // Update contentState with new parameters
            setContent(prevState => {
                return prevState.map((sC, sIdx) => {
                    if (sIdx === index && sC.type === type) return { ...sC, code, language };
                    return sC;
                })
            });
        } else if (type === "iframe") {
            const [iframetype, url, title] = args;

            // Update contentState with new parameters
            setContent(prevState => {
                return prevState.map((sC, sIdx) => {
                    if (sIdx === index && sC.type === type) return { ...sC, iframetype, url, title };
                    return sC;
                })
            });
        }
    }
    console.log(state?.errors);
    return (
        <form action={dispatch} className="flex flex-col p-2">
            <FlexTextAreaStateful
                id='title'
                name='project-title'
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
                name='project-summary'
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
                name='project-header'
                showLabel={true}
                visualName='Header Image Url'
                minLength={10}
                maxLength={255}
                allowEnter={false}
                textSize="p"
                textStyle="normal"
                error={state?.errors?.header}
            />
            <FlexTextAreaStateful
                id='projecturl'
                name='project-projecturl'
                showLabel={true}
                visualName='Project Url'
                minLength={10}
                maxLength={255}
                allowEnter={false}
                textSize="p"
                textStyle="normal"
                error={state?.errors?.header}
            />

            <div id='project-content'>


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
            </div>
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