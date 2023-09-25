/**
 * @param {string} src
 */
export function preloadImage(src) {
    return new Promise((resolve, reject) => {
        Object.assign(new Image(), {
            src,
            onload: resolve,
            onerror: reject,
        });
    });
}
