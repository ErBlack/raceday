/**
 * @param {string} string
 */
export function encrypt(string) {
    return string
        .split('')
        .map((letter, i) => {
            return (
                String.fromCharCode(letter.charCodeAt(0) + 16 + i) + (i === string.length - 1 || (i + 1) % 4 ? '' : '-')
            );
        })
        .join('');
}

/**
 * @param {string} string
 */
function decrypt(string) {
    return string
        .replace(/-/g, '')
        .split('')
        .map((letter, i) => {
            return String.fromCharCode(letter.charCodeAt(0) - 16 - i);
        })
        .join('');
}

if (typeof window !== 'undefined') {
    // @ts-ignore
    window.checkCode = s => (s ? new Date(Number(`${decrypt(s)}0`)).toISOString() : undefined);
}
