import { Nissan } from './car';

/**
 * @type number
 */
let lastTime;

/**
 * @type number
 */
let animationFrame;

/**
 * @param {number} dt;
 */
const tick = dt => {
    Nissan.update(dt);
};

const loop = () => {
    const now = Date.now();
    /**
     * @type number
     */
    const dt = now - lastTime;

    tick(dt);

    lastTime = now;

    frame();
};

const frame = () => {
    animationFrame = requestAnimationFrame(loop);
};

export const start = () => {
    lastTime = Date.now();

    frame();
};

export const stop = () => {
    cancelAnimationFrame(animationFrame);
};
