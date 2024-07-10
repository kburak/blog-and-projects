
/*

THERE WAS A SLUG CREATED LIKE THIS:
   vestibulum-non-

FIX IT!!!!!!


*/

export default function makeSlug(str: string, maxLength: number = 40): string {
    // str is valid and no empty space then return (return not more than maxLength)
    if (str.length === str.toLowerCase().match(/[a-z0-9]/g)?.length) return str.slice(0, maxLength).toLowerCase();

    // Trim empty spaces at the beginning and end of str.
    if (str[0] === " " || str[str.length - 1] === " ") {
        // Trim beginning
        let start = 0,
            end = str.length - 1;
        for (let i = 0; i < str.length; i++) {
            if (str[i] === " ") {
                start++;
            } else {
                // Break as soon as we see a non-Empty space
                break;
            }
        }

        // Trim end
        for (let i = end; i > 0; i--) {
            if (str[i] === " ") {
                end--;
            } else {
                // Break as soon as we see a non-Empty space
                break;
            }
        }

        str = str.slice(start, end);
    }

    // Reduce empty spaces to one empty space, replace empty space with -
    let prevEmpty = false;
    let slug = "";
    for (let i = 0; i < str.length; i++) {
        if (prevEmpty && str[i] === " ") {
            continue;
        } else if (str[i] === " ") {
            prevEmpty = true;
            // If not at beginning or end of str then replace " " with "-"
            if (i !== 0 && i !== str.length - 1) {
                slug += "-";
            }
        } else {
            prevEmpty = false;
            slug += str[i].toLowerCase();
        }
    }

    // Replace everyting that's not A-Z0-9 or -> /(?![a-z0-9-])./
    slug = slug.replace(/(?![a-z0-9-])./g, '');

    // Return max 40 chars length
    return slug.slice(0, maxLength);
}