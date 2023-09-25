/**
 * @param {[number, number, number, number]} points
 * @param {number} t
 */
export const applyBezier = ([p0, p1, p2, p3], t) => {
    const oneMinusT = 1 - t;
    return (
        Math.pow(oneMinusT, 3) * p0 +
        3 * Math.pow(oneMinusT, 2) * t * p1 +
        3 * oneMinusT * Math.pow(t, 2) * p2 +
        Math.pow(t, 3) * p3
    );
};
