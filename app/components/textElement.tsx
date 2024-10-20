import sanitizeHtml from 'sanitize-html';
import React from 'react';
import { JSDOM } from 'jsdom';

export default function TextElement(
    { htmlStr, idx, split_idx, size, style }: { htmlStr: string, idx: number, split_idx: number, size: string, style: string }
) {

    // Remove "\n" at the beginning and end.
    htmlStr = htmlStr.replace(/^\n|\n$/g, "");

    // Does htmlStr start with a <ul> tag?
    const isUlTag = !!htmlStr.match(/^\s+<ul>|^<ul>/g); // !! => converts truthy/falsy to boolean.

    // Sanitize htmlStr
    const cleanHtmlStr = sanitizeHtml(htmlStr, {
        allowedAttributes: {
            a: ['href', 'name', 'target', 'style']
        }
    });

    let dom: JSDOM, elm;

    // Create dom on server
    if (isUlTag) {
        // PARSE htmlStr without putting it into p element
        dom = new JSDOM(`${cleanHtmlStr}`);

        // Find elm in dom.
        elm = dom.window.document.body.querySelector("ul"); // <body> is implicitly created
        
    } else {
        // PARSE htmlStr into a p element.
        dom = new JSDOM(`<p>${cleanHtmlStr}</p>`);

        // Find elm in dom.
        elm = dom.window.document.body.querySelector("p"); // <body> is implicitly created

    }

    // Configure elm's attributes according to given args.
    if (elm) {
        elm.setAttribute("key", `${idx}-text-${split_idx}`);
        elm.setAttribute("className", `${size === 'h1' && 'text-xl'} ${size === 'p' && 'text-lg md:text-xl'} ${style === 'bold' && 'font-bold'} ${style === 'italic' && 'italic'} ${style === 'normal' && 'font-normal'} leading-8 md:leading-9 pt-2 pb-2`);
        // console.log("p.attributes array", Array.from(p.attributes));

        // Add list style if <ul> tag
        if(isUlTag){
            const existingClassValue = elm.getAttribute("className");
            elm.setAttribute("className", `${existingClassValue} list-inside list-disc`);
        }
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

    if (elm) {
        return domElmToReactElement(elm);
    }

}