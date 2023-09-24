/**
 * @type number
 */
let lastTime;

/**
 * @type number
 */
let animationFrame;

/**
 * @type {{update: (dt: number) => void}[]} object
 */
let objects = [];

/**
 * @param {number} dt;
 */
const tick = dt => {
    objects.forEach(object => object.update(dt));
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

/**
 * @param {{update: (dt: number) => void}[]} gameObjects
 */
export const start = gameObjects => {
    lastTime = Date.now();

    objects = gameObjects;

    frame();
};

export const stop = () => {
    cancelAnimationFrame(animationFrame);
};
