"use client";

import { useEffect, useRef, useState } from "react";
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from "clsx";

export default function TagSelector({ allTags, initSelTags = [], errors }: { allTags: any[], initSelTags?: any[], errors: string[] }) {

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
        selectedTags: initSelTags.map(i_tag => ({ ...i_tag, dbInsert: false, dbDelete: false })), // Extend tab objects for db logic.
        currentFocus: 0
    }
    // console.log(initialListState)

    // State that keeps track if autocomplete list is shown
    const [listState, setListState] = useState(initialListState);
    const AV_TAGS_REF = useRef<HTMLDivElement>(null);

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
        console.log("handleClick", id, name);
        // console.log(id);
        if (id && name) {
            setListState(prevState => {
                console.log("handleClick seListState");
                // Check if the tag relation exists in initSetTags / in DB
                const exists = initSelTags.some(i_tag => i_tag.id === id);

                // Does the tag relation exist already in DB?
                if (exists) { // If exists
                    // Hold existing tag obj in a variable
                    const existingTagObj = prevState.selectedTags.find(tag => tag.id === id && tag.name === name);

                    // Is it marked to be deleted?
                    if (existingTagObj.dbDelete) {

                        return {
                            ...prevState,
                            value: "",
                            availabletags: allTags,
                            matchLength: 0,
                            currentFocus: 0,
                            // Filter out existingObj from selectedTags
                            // Push existing obj as last element (so that it shows up as last added element)
                            selectedTags: [
                                ...prevState.selectedTags.filter(tag => tag.id !== id),
                                { ...existingTagObj, dbDelete: false } // Pass existingObj as new obj instance and set its dbDelete to false
                            ]
                        };

                    } else {
                        console.log("2");
                        // Not marked to be deleted, the return existing selectedTags state
                        return {
                            ...prevState,
                            value: "",
                            availabletags: allTags,
                            matchLength: 0,
                            currentFocus: 0,
                            selectedTags: prevState.selectedTags
                        };
                    }

                } else {
                    // If NOT exists in DB and NOT yet added to selectedTags, add it along with dbAction property set to false
                    return {
                        ...prevState,
                        show: false,
                        value: "",
                        currentFocus: 0,
                        selectedTags: prevState.selectedTags.some((s_tag) => s_tag.id === id) ? prevState.selectedTags : [...prevState.selectedTags, { id, name, dbInsert: true, dbDelete: false }]
                    };
                }
            });
        }
    }

    // Handle key down while typing
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        console.log("handleKeyDown");
        if (e.code === "ArrowDown") {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            setListState(prevState => {
                const newIdx = Math.min(Math.max(prevState.currentFocus + 1, 0), prevState.availabletags.length - 1);
                console.log("Currentfocus increase", prevState.currentFocus + 1, prevState.availabletags.length, newIdx);

                // Scroll to currently focused tag / bring it to viewable part.
                scrollToFocusedTag(newIdx);

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

                // Scroll to currently focused tag / bring it to viewable part.
                scrollToFocusedTag(newIdx);

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
                console.log("Hit Enter", prevState);
                // Is currentFocus valid?
                if (prevState.currentFocus > -1) {
                    const { id, name } = prevState.availabletags[prevState.currentFocus];

                    // Check if the tag relation exists in initSetTags / in DB
                    const exists = initSelTags.some(i_tag => i_tag.id === id);

                    // Does the tag relation exist already in DB?
                    if (exists) { // if exists

                        // Hold existing tag obj in a variable
                        const existingTagObj = prevState.selectedTags.find(tag => tag.id === id && tag.name === name);

                        // Is it marked to be deleted?
                        if (existingTagObj.dbDelete) {

                            return {
                                ...prevState,
                                value: "",
                                availabletags: allTags,
                                matchLength: 0,
                                currentFocus: 0,
                                // Filter out existingObj from selectedTags
                                // Push existing obj as last element (so that it shows up as last added element)
                                selectedTags: [
                                    ...prevState.selectedTags.filter(tag => tag.id !== id),
                                    { ...existingTagObj, dbDelete: false } // Pass existingObj as new obj instance and set its dbDelete to false
                                ]
                            };

                        } else {
                            console.log("2");
                            // Not marked to be deleted, the return existing selectedTags state
                            return {
                                ...prevState,
                                value: "",
                                availabletags: allTags,
                                matchLength: 0,
                                currentFocus: 0,
                                selectedTags: prevState.selectedTags
                            };
                        }

                    } else {
                        // If NOT exists in DB and NOT yet added to selectedTags, add it along with dbAction property set to false
                        return {
                            ...prevState,
                            value: "",
                            availabletags: allTags,
                            matchLength: 0,
                            currentFocus: 0,
                            selectedTags: prevState.selectedTags.some((s_tag) => s_tag.id === id) ? prevState.selectedTags : [...prevState.selectedTags, { id, name, dbInsert: true, dbDelete: false }]
                        }
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

    function scrollToFocusedTag(index: number) {
        // console.log("scrollToFocusedTag AV_TAGS_REF", AV_TAGS_REF.current);
        if (AV_TAGS_REF.current) {

            const parent = AV_TAGS_REF.current;
            const { top: parentTop, bottom: parentBottom, height: parentHeight } = parent.getBoundingClientRect();
            const scrollable = parentHeight < parent.scrollHeight;

            // Are there any children and Is there already scrollable area?
            if (parent.children.length > 0 && scrollable) {
                // Get the current focused child
                const child = parent?.children[index];
                const { top: childTop, bottom: childBottom } = child.getBoundingClientRect();

                // Shift scroll area based on top, bottom positions of child relative to parent top, bottom positions
                if(childBottom > parentBottom){
                    // Calculate detal, the area that needs to be added to scrollTop so that the current tag is in view area.
                    const delta = childBottom - parentBottom;
                    console.log("scrollTop will be increased by", delta);
                    parent.scrollTop = parent.scrollTop + delta;
                } else if(childTop < parentTop){
                    const delta = parentTop - childTop;
                    console.log("scrollTop will be decreased by", delta);
                    parent.scrollTop = parent.scrollTop - delta;
                }

            }


        }



    }

    function handleDelete(e: React.MouseEvent<SVGSVGElement>) {
        const removeTagId = e.currentTarget.id.replace('delete-selectedTag-', '');

        setListState(prevState => {
            // Check if the tag relation exists in initSetTags / in DB
            const exists = initSelTags.some(i_tag => i_tag.id === removeTagId);

            // Does the tag relation exist already in DB?
            if (exists) {
                // If exists, set dbDelete to true, but keep it in selectedTags
                return {
                    ...prevState,
                    selectedTags: prevState.selectedTags.map(tag => {
                        if (tag.id === removeTagId) {
                            return {
                                ...tag,
                                dbDelete: true
                            }
                        }
                        return tag;
                    })
                }
            } else {
                // If NOT exists, remove it from selectedTags array.
                return {
                    ...prevState,
                    selectedTags: prevState.selectedTags.filter(tag => tag.id !== removeTagId)
                }
            }
        });
    }

    // Handle mouse over events on the autocomplete list items
    function handleMouseOver(e: React.MouseEvent<HTMLInputElement>) {
        console.log("handleMouseOver");
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
                {listState.selectedTags.map((tag, idx) => {
                    return <div
                        id={`selectedTag-wrap-${tag.name}`}
                        key={`selectedTag-wrap-${tag.name}`}
                        className={clsx(
                            "flex mb-2 md:mb-2 md:w-1/4",
                            { "hidden": tag.dbDelete }
                        )}
                    >
                        {/* Hidden fields */}
                        <input
                            id="dbInsert"
                            name={`${idx}-tag-dbInsert`}
                            type="hidden"
                            value={tag.dbInsert}
                            readOnly
                        />
                        <input
                            id="dbDelete"
                            name={`${idx}-tag-dbDelete`}
                            type="hidden"
                            value={tag.dbDelete}
                            readOnly
                        />
                        <input
                            id="hiddenId"
                            name={`${idx}-tag-id`}
                            type="hidden"
                            value={tag.id}
                            readOnly
                        />
                        {/* Hidden fields */}
                        {/* Visual fields */}
                        <input
                            className={clsx(
                                "bg-gray-100 w-full md:w-1/8 h-8",
                                { "bg-green-400": tag.dbInsert },
                                { "hidden": tag.dbDelete }
                            )}
                            type="text"
                            value={tag.name}
                            readOnly
                        />
                        <XMarkIcon
                            id={`delete-selectedTag-${tag.id}`}
                            className="inline w-6"
                            onClick={handleDelete}
                        />
                        {/* Visual fields */}
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
                <div
                    className="max-h-64 overflow-y-auto p-0 border-b-[1px] border-gray-400 border-solid"
                    ref={AV_TAGS_REF}
                >
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
