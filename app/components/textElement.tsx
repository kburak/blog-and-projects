import sanitizeHtml from 'sanitize-html';
import React from 'react';
import { JSDOM } from 'jsdom';

export default function TextElement(
    { htmlStr, idx, split_idx, size, style }: { htmlStr: string, idx: number, split_idx: number, size: string, style: string }
) {

    // Sanitize htmlStr
    const cleanHtmlStr = sanitizeHtml(htmlStr, {
        allowedAttributes: {
            a: ['href', 'name', 'target', 'style']
        }
    });

    // Create dom on server side and PARSE htmlStr into a p element.
    const dom = new JSDOM(`<p>${cleanHtmlStr}</p>`);

    // Find and configure p elm's attributes according to given args.
    const p = dom.window.document.body.querySelector("p"); // <body> is implicitly created
    if(p){
        p.setAttribute("key", `${idx}-text-${split_idx}`);
        p.setAttribute("className", `${size === 'h1' && 'text-xl'} ${size === 'p' && 'text-base'} ${style === 'bold' && 'font-bold'} ${style === 'italic' && 'italic'} ${style === 'normal' && 'font-normal'} leading-relaxed pt-2 pb-2`);
        // console.log("p.attributes array", Array.from(p.attributes));
    }

    // Convert given domElement into React Element. Iterate children recursively and resolve all to ReachElements.
    function domElmToReactElement(domElement: HTMLElement | undefined) {
        if (domElement) {

            const tagName = domElement.tagName.toLowerCase();
            const props: { [key: string]: string } = {};

            // Copy attributes from DOM element
            for (const attr of Array.from(domElement.attributes)) {
                if (attr.name === "classname") {
                    props["className"] = domElement.getAttribute("className") || "";
                } else {
                    props[attr.name] = domElement.getAttribute(attr.name) || "";
                }
            }

            // Is Link Element? Then add additional style classes.
            if (tagName === "a") {
                props["className"] ?
                    props["className"] += "text-blue-700 underline"
                    :
                    props["className"] = "text-blue-700 underline";
            }

            // If the element contains only text
            if (domElement.childNodes.length === 1 && domElement.childNodes[0].nodeType === dom.window.document.TEXT_NODE) {
                return React.createElement(tagName, props, domElement.textContent);
            }

            // If the element has children, handle them recursively
            const children: React.ReactNode[] = Array.from(domElement.childNodes).map((childNode: ChildNode) =>
                childNode.nodeType === dom.window.document.ELEMENT_NODE
                    ? domElmToReactElement(childNode as HTMLElement)  // Recurse for elements
                    : childNode.textContent                // Use text for text nodes
            );

            return React.createElement(tagName, props, ...children);

        }
    }

    if(p){
        return domElmToReactElement(p)
    }

}