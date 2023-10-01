import { random } from '../../lib/random';
import { CARS } from '../assets';
import { Car } from './car';
import { Exhaust } from './exhaust';

export class Mitsubishi extends Car {
    /**
     * @type {Exhaust | undefined}
     */
    #exhaust;
    constructor() {
        super({
            speedRatio: 26.6,
            gearRatio: [2.97, 2.07, 1.43, 1, 0.84, 0.56],
            gearVelocity: [
                [1, 50, 154, 80],
                [1, 6, 140, 65],
                [1, 12, 207, 82],
                [1, 5, 237, 115],
                [1, 0, 50, 210],
                [1, 10, 380, 250],
            ],
            maxRpm: 8000,
            power: 0.0045,
            x: 750,
            sprite: CARS[0],
        });
    }
    /**
     * @param {number} dt
     */
    update(dt) {
        super.update(dt);

        if (this.#exhaust) {
            this.#exhaust.update(dt);
            if (this.#exhaust.done) {
                this.#exhaust = undefined;
            }
        }
    }

    /**
     * @param {CanvasRenderingContext2D} context
     * @param {number} worldDistance
     */
    render(context, worldDistance) {
        super.render(context, worldDistance);

        this.#exhaust && this.#exhaust.render(context, this.x + 18, this.y + 215);
    }

    gearUp() {
        const result = super.gearUp();

        if (result) {
            this.#exhaust = new Exhaust(13, random(37, 42));
        }

        return result;
    }
}
