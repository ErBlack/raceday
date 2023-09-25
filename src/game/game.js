import { clear, gameState, init } from './game-state';
import { render } from './render';

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
    gameState.objects.forEach(object => object.update(dt));
    render();
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

    init();

    frame();
};

export const stop = () => {
    cancelAnimationFrame(animationFrame);

    clear();
};
