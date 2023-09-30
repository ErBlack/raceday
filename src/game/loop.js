import { gameState } from './game';
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

export const startLoop = () => {
    lastTime = Date.now();

    frame();
};

export const stopLoop = () => {
    typeof cancelAnimationFrame !== 'undefined' && cancelAnimationFrame(animationFrame);
};
