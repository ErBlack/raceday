import { EXHAUST } from '../assets';

export class Exhaust {
    #start;
    #frameDuration = 80;
    #frameNumber = 0;
    /**
     * @type {number}
     */
    #width;
    /**
     * @type {number}
     */
    #height;

    /**
     * @param {number} width
     * @param {number} height
     */
    constructor(width, height) {
        this.#start = 0;
        this.#width = width;
        this.#height = height;
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        this.#start += dt;

        this.#frameNumber = Math.floor(this.#start / this.#frameDuration);

        if (this.#frameNumber >= EXHAUST.length) {
            this.done = true;
        }
    }
    /**
     * @param {CanvasRenderingContext2D} context
     * @param {number} x
     * @param {number} y
     */
    render(context, x, y) {
        context.drawImage(EXHAUST[this.#frameNumber % EXHAUST.length], x, y, this.#width, this.#height);
    }
}
