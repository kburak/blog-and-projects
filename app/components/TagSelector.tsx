"use client";

import { useState } from "react";
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from "clsx";

export default function TagSelector() {
    // Get all blog tags
    const blogTags = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

    const initialState: {
        show: boolean,
        value: string,
        matchLength: number,
        availabletags: string[],
        selectedTags: string[],
        currentFocus: number
    } = {
        show: false,
        value: "",
        matchLength: 0,
        availabletags: blogTags,
        selectedTags: [],
        currentFocus: 0
    }

    // State that keeps track if autocomplete list is shown
    const [listState, setListState] = useState(initialState);

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
                availabletags: blogTags.filter(avTag => avTag.substring(0, newLength).toLowerCase() === newValue.toLowerCase())
            }
        });

        setListState(prevState => {
            console.log(prevState);
            return prevState;
        });

    }

    function handleClick(e: React.MouseEvent<HTMLParagraphElement>) {
        const newTag = e.currentTarget.id.replace('avTag-', '');
        // console.log(id);
        if (newTag) {
            setListState(prevState => ({
                ...prevState,
                show: false,
                value: "",
                selectedTags: !prevState.selectedTags.includes(newTag) ? [...prevState.selectedTags, newTag] : prevState.selectedTags
            }));
        }

        setListState(prevState => {
            console.log(prevState);
            return prevState;
        });
    }

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
                    value: prevState.availabletags[newIdx]
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
                    value: prevState.availabletags[newIdx]
                }
            });
        } else if (e.code === "Enter" || e.code === "NumpadEnter") {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();

            setListState(prevState => {
                // Does the entered value exist as a tag in avaiableTags array OR is there only one tag left in avaiable tags?
                console.log("Hit Enter", prevState);
                if (prevState.currentFocus > -1 && (prevState.availabletags.includes(prevState.value) || prevState.availabletags.length === 1)) {
                    const tag = prevState.availabletags[prevState.currentFocus];
                    return {
                        ...prevState,
                        show: false,
                        value: "",
                        selectedTags: !prevState.selectedTags.includes(tag) ? [...prevState.selectedTags, tag] : prevState.selectedTags,
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
        const removeTag = e.currentTarget.id.replace('delete-selectedTag-', '');
        // Remove tag from state
        setListState(prevState => ({
            ...prevState,
            selectedTags: prevState.selectedTags.filter(tag => tag !== removeTag)
        }));
    }

    return (
        <div className="mb-4">
            <p>Select Tags</p>
            {/* Selected Tags */}
            <div className="md:flex flex-wrap">
                {listState.selectedTags.map((tag) => {
                    return <div
                        id={`selectedTag-wrap-${tag}`}
                        key={`selectedTag-wrap-${tag}`}
                        className="flex mb-2 md:mb-2 md:w-1/4"
                    >
                        <input
                            name="tags[]"
                            className="bg-gray-100 w-full md:w-1/8 h-8"
                            type="text"
                            value={tag}
                            readOnly
                        />
                        <XMarkIcon
                            id={`delete-selectedTag-${tag}`}
                            className="inline w-6"
                            onClick={handleDelete}
                        />
                    </div>
                })}
            </div>
            {/* Input Field */}
            <input
                className="bg-green-100 w-full h-8 mt-2"
                type="text"
                onChange={handleChange}
                value={listState.value}
                onKeyDown={handleKeyDown}
                placeholder="Start typing a tag name..."
            />
            {/* Avaiable Tag Autocomplete List */}
            {listState.show && listState.availabletags.length > 0 &&
                <div className="border-t-0 border-r-2 border-b-2 border-l-2 border-grey-300 border-solid">
                    {
                        listState.availabletags.map((tag, idx) => {
                            return <p
                                id={`avTag-${tag}`}
                                key={`avTag-${tag}`}
                                onClick={handleClick}
                                className={clsx(
                                    "text-lg",
                                    { "bg-green-100": listState.currentFocus === idx }
                                )}
                            >
                                <strong>{tag.substring(0, listState.matchLength)}</strong>
                                {tag.substring(listState.matchLength)}
                            </p>
                        })
                    }
                </div>
            }
        </div>

    );
}
