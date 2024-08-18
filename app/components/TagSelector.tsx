"use client";

import { useEffect, useState } from "react";
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from "clsx";

export default function TagSelector({ allTags, errors }: { allTags: any[], errors: string[] }) {

    const initialListState: {
        show: boolean,
        value: string,
        matchLength: number,
        availabletags: any[],
        selectedTags: any[],
        currentFocus: number
    } = {
        show: false,
        value: "",
        matchLength: 0,
        availabletags: allTags, /* [...allTags, ...(new Array(100)).fill({name: "test"})], */
        selectedTags: [],
        currentFocus: 0
    }
    // console.log(initialListState)

    // State that keeps track if autocomplete list is shown
    const [listState, setListState] = useState(initialListState);

    // Handle focus on input element
    function handleFocus() {
        // Show autocomplete list
        setListState(prevState => ({
            ...prevState,
            show: true
        }));
    }

    // Handle click away from input element
    function handleClickAway(e: any) {
        // console.log(e.target);
        // if clicked element is an HTMLElement and NOT includes avTag and NOT equal to tag-input-field, hide the list.
        if (
            e.target instanceof HTMLElement &&
            !e.target?.id.includes('avTag') &&
            e.target?.id !== 'tag-input-field'
        ) {
            setListState((prevState) => ({
                ...prevState,
                show: false,
                currentFocus: 0
            }))
        }
    }

    // Handle typing/input
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

        const newValue = e.target.value;
        const newLength = newValue.length;

        // Show autocomplete list AND Add tags to the state list that have the same value when shortened to the length of entered value
        setListState(prevState => {
            return {
                ...prevState,
                show: true,
                value: newValue,
                matchLength: newLength,
                availabletags: allTags.filter(avTag => avTag.name.substring(0, newLength).toLowerCase() === newValue.toLowerCase())
            }
        });
    }

    // Handle Tag click
    function handleClick(id: string, name: string, e: React.MouseEvent<HTMLParagraphElement>) {
        // console.log("handleClick");
        // const newTag = e.currentTarget.id.replace(/^[0-9]+-avTag-/, '');
        console.log("handleClick", id, name);
        // console.log(id);
        if (id && name) {
            setListState(prevState => ({
                ...prevState,
                show: false,
                value: "",
                selectedTags: prevState.selectedTags.some((s_tag) => s_tag.id === id) ? prevState.selectedTags : [...prevState.selectedTags, { id, name }]
            }));
        }
    }

    // Handle key down while typing
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.code === "ArrowDown") {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            setListState(prevState => {
                const newIdx = Math.min(Math.max(prevState.currentFocus + 1, 0), prevState.availabletags.length - 1);
                console.log("Currentfocus increase", prevState.currentFocus + 1, prevState.availabletags.length, newIdx);
                return {
                    ...prevState,
                    currentFocus: newIdx,
                    value: prevState.availabletags[newIdx].name
                }
            });
        } else if (e.code === "ArrowUp") { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            setListState(prevState => {
                const newIdx = Math.min(Math.max(prevState.currentFocus - 1, 0), prevState.availabletags.length - 1);
                console.log("Currentfocus decrease", prevState.currentFocus - 1, prevState.availabletags.length, newIdx);
                return {
                    ...prevState,
                    currentFocus: newIdx,
                    value: prevState.availabletags[newIdx].name
                }
            });
        } else if (e.code === "Enter" || e.code === "NumpadEnter") {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();

            setListState(prevState => {
                // Does the entered value exist as a tag in avaiableTags array OR is there only one tag left in avaiable tags?
                console.log("Hit Enter", prevState);
                if (prevState.currentFocus > -1) {
                    const { id, name } = prevState.availabletags[prevState.currentFocus];
                    return {
                        ...prevState,
                        /* show: false, */
                        value: "",
                        availabletags: allTags,
                        matchLength: 0,
                        selectedTags: prevState.selectedTags.some((s_tag) => s_tag.id === id) ? prevState.selectedTags : [...prevState.selectedTags, { id, name }],
                        currentFocus: 0
                    }
                } else {
                    // Hide autocomplete list
                    return {
                        ...prevState,
                        show: false
                    };
                }
            });
        } else if (e.code === "Escape" || e.code === "Tab") {
            // Close autocomplete list
            setListState(prevState => ({
                ...prevState,
                show: false
            }));
        }
    }

    function handleDelete(e: React.MouseEvent<SVGSVGElement>) {
        const removeTagId = e.currentTarget.id.replace('delete-selectedTag-', '');
        // Remove tag from state
        setListState(prevState => ({
            ...prevState,
            selectedTags: prevState.selectedTags.filter(tag => tag.id !== removeTagId)
        }));
    }

    // Handle mouse over events on the autocomplete list items
    function handleMouseOver(e: React.MouseEvent<HTMLInputElement>) {
        // Extract id
        const matchRes = e.currentTarget.id.match(/^[0-9]+/);
        if (matchRes) {
            const tagIdx = parseInt(matchRes[0]);

            // Set currentFocus
            setListState(prevState => ({
                ...prevState,
                currentFocus: tagIdx
            }))
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClickAway)

        return () => {
            // Clear handleClickAway click even listener
            document.removeEventListener("click", handleClickAway);
        }
    }, []); // [] => Run only once

    return (
        <div className="mb-4">
            <p>Select Tags</p>
            {/* Selected Tags */}
            <div className="md:flex flex-wrap">
                {listState.selectedTags.map((tag) => {
                    return <div
                        id={`selectedTag-wrap-${tag.name}`}
                        key={`selectedTag-wrap-${tag.name}`}
                        className="flex mb-2 md:mb-2 md:w-1/4"
                    >
                        <input
                            id="hiddenId"
                            name="tags[]"
                            type="hidden"
                            value={tag.id}
                            readOnly
                        />
                        <input
                            className="bg-gray-100 w-full md:w-1/8 h-8"
                            type="text"
                            value={tag.name}
                            readOnly
                        />
                        <XMarkIcon
                            id={`delete-selectedTag-${tag.id}`}
                            className="inline w-6"
                            onClick={handleDelete}
                        />
                    </div>
                })}
            </div>
            {/* Validation Errors */}
            {errors &&
                errors.map((error: string) => (
                    <p className="text-sm text-red-500" key={error}>
                        {error}
                    </p>
                ))
            }
            {/* Input Field */}
            <input
                id="tag-input-field"
                className="bg-green-100 w-full h-10 mt-2 p-2"
                type="text"
                onChange={handleChange}
                value={listState.value}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                /* onBlur={handleBlur} */ // Click away
                placeholder="Start typing a tag name..."
            />
            {/* Avaiable Tag Autocomplete List */}
            {listState.show && listState.availabletags.length > 0 &&
                <div className="max-h-64 overflow-y-auto p-0">
                    {
                        listState.availabletags.map((tag, idx) => {

                            const handleClickWithTag = handleClick.bind(null, tag.id, tag.name);
                            return <p
                                id={`${idx}-avTag-${tag.id}-${tag.name}`}
                                key={`${idx}-avTag-${tag.id}-${tag.name}`}
                                onClick={handleClickWithTag}
                                onMouseOver={handleMouseOver}
                                className={clsx(
                                    "w-full text-lg border-t-[1px] border-l-[1px] border-r-[1px] border-gray-400 border-solid p-2",
                                    { "bg-gray-200": listState.currentFocus === idx },
                                    { "border-t-0": idx === 0 }, // Don't show top border for first item
                                    { "border-b-[1px]": listState.availabletags.length - 1 === idx } // Show border at bottom when last item
                                )}
                            >
                                <strong>{tag.name.substring(0, listState.matchLength)}</strong>
                                {tag.name.substring(listState.matchLength)}
                            </p>

                        })
                    }
                </div>
            }
        </div>

    );
}
